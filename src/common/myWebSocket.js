import * as uuid from "uuid";
import {
    TOTP
} from "jsotp";
import {
    AES,
    enc,
    MD5
} from "crypto-js";

let ErrorCode = {
    SOCKET_ERR: -1,
    SUCCESS: 0,
    SYSTEM_ERR: 1,
    REQUEST_ERR: 2,
    NEED_LOGIN: 5,
    SESSION_EXPIRED: 7,
    ACCT_ID_REQUIRED: 10101,
    ACCT_PASS_REQUIRED: 10102,
    ACCT_NOT_FOUND: 10103,
    ACCT_PASS_ERR: 10104,
    ACCT_STA_INACTIVED: 10105,
    ACCT_ROLE_ERR: 10106,
    ACCT_ROLE_INVALID: 10107,
    ACCT_LOCKED: 10110,
    BALANCE_NOT_ENOUGH: 11101
};
class Service {
    constructor(url) {
        this.CRYPTO_AES = 99999;
        this.regUrl = /^wss?:\/\/.+\.[a-zA-Z]+(:\d+)?/;
        this.regMessage = /^-?\d+\.{.+}$/;
        this.regReq = /^-?\d+\..+$/;
        this.reConnectTimes = 1;
        this.reConnectCounterMax = 5;
        this.onErrorHandle = null;
        this.onOpenHandle = null;
        this.promisePool = {}; // 请求池
        this.pushPool = {}; // 推送池
        this.isManualClose = false;
        this.url = url;
        this.AES = {
            key: "",
            iv: "",
            key_original: ""
        };
        this.OTP = {
            open: false,
            totp: "",
            timeCode: "",
        };
        // this.connect();
    }
    connect() {
        if (!this.regUrl.test(this.url)) return this._printLog("websocket: url error!");
        return new Promise((resolve, reject) => {
            this._createWebSocket(resolve, reject)
        })
    }

    send(command, data, callback) {
        if (!this.socket || this.socket.readyState == WebSocket.CLOSED) this.connect(); //不先调用connect 直接send时的处理
        if (command < 0) return console.warn('send command must >=0!')
        let plainText, cipherText, key;
        if (command == this.CRYPTO_AES) {
            plainText = cipherText = command;
            key = command;
        } else {
            data.serialNo = uuid.v1();
            plainText = command + "." + JSON.stringify(data);
            cipherText = this._encryption(plainText);
            key = data.serialNo;
        }
        if (this.socket && this.socket.readyState == WebSocket.OPEN) {
            this._socketSend(cipherText, plainText)
        }
        return new Promise((resolve, reject) => {
            this.promisePool[key] = {
                command,
                resolve,
                reject,
                plainText,
                callback
            };
        })
    }
    bindPushEvent(command, callback) {
        if (command >= 0) return console.warn('bindPushEvent command must <0!')
        let key = command;
        this.pushPool[key] = {
            command,
            callback
        };
    }
    _createWebSocket(resolve, reject) {
        this._printLog("websocket: " + this.url + " socket is connecting... No." + this.reConnectTimes);
        this.socket = new WebSocket(this.url);
        this.socket.onopen = async (e) => {
            this._printLog("websocket: " + this.url + " socket open in No." + this.reConnectTimes + "!");
            this.reConnectTimes = 1;
            this.onOpenHandle && this.onOpenHandle();
            const {
                salt,
                key,
                iv
            } = await this.send(this.CRYPTO_AES, {}, null);
            this._initAES(salt, key, iv);
            resolve(this.socket);
            Object.values(this.promisePool).forEach(({
                plainText
            }) => {
                this._socketSend(this._encryption(plainText), plainText)
            })
        };
        this.socket.onclose = e => {
            if (this.isManualClose) {
                this._printLog("websocket: " + this.url + "socket closed by user!")
            } else {
                this.reConnectTimes++
                if (this.reConnectTimes <=  this.reConnectCounterMax) {
                    this._createWebSocket(resolve, reject);
                } else {
                    reject("websocket:" + this.url + "reconnect " + this.reConnectCounterMax + " times, socket closed!")
                }
            }
            this.isManualClose = false;
        };
        this.socket.onerror = e => {
            let error = {
                code: ErrorCode.SOCKET_ERR,
                msg: "websocket: " + this.url + "socket error!"
            }
            if (this.reConnectTimes == this.reConnectCounterMax) {
                this.onErrorHandle && this.onErrorHandle(error);
                reject("websocket:" + this.url + "reconnect " + this.reConnectCounterMax + " times, socket error!")
            }
        };
        this.socket.onmessage = e => {
            let plainText, cipherText;
            cipherText = e.data;
            plainText = e.data.split('.')[0] == this.CRYPTO_AES ? cipherText : this._decryption(cipherText);
            this._printLog('res:' + plainText)
            const response = this._parseReqData(plainText);
            if (!response || !response.command) {
                console.error("websocket: decryption error!");
                this._printLog(plainText)
                debugger
            }

            if (response.data.code > 0) {
                console.error("websocket: response error!");
                this.onErrorHandle && this.onErrorHandle(response.data);
                return;
            }
            const key = (response.command < 0 || response.command == this.CRYPTO_AES) ? response.command : response.data.serialNo;
            if (response.command < 0) {
                const pushItem = this.pushPool[key];
                pushItem&&pushItem.callback && pushItem.callback(response.data);
            } else {
                const sendPromise = this.promisePool[key];
                sendPromise.callback && sendPromise.callback(response.data);
                sendPromise.resolve && sendPromise.resolve(response.data);
                delete this.promisePool[key];
            }
        };
    }

    _initAES(salt, key, iv) {
        if (salt.length == 0) { //不用jsOTP
            this.OTP.open = false;
            this.AES = {
                key: enc.Hex.parse(key),
                iv: enc.Hex.parse(iv)
            }
        } else {
            this.OTP.open = true;
            this.OTP.totp = TOTP(salt, 1800)
            this.AES = {
                key_original: key,
                key: enc.Hex.parse(key),
                iv: enc.Hex.parse(iv)
            }
        }
    }

    _socketSend(cipherText, plainText) {
        this._printLog('req:' + plainText);
        this.socket.send(cipherText)
    }

    _encryption(plainText) {
        this._updateAESKey();
        let data = AES.encrypt(plainText, this.AES.key, {
            iv: this.AES.iv
        }).ciphertext;
        var cipherText = enc.Base64.stringify(data);
        return cipherText;
    }

    _decryption(cipherText) {
        this._updateAESKey();
        try {
            var bytes = AES.decrypt(cipherText, this.AES.key, {
                iv: this.AES.iv
            });
            return bytes.toString(enc.Utf8);
        } catch (error) {
            this._printLog(cipherText)
        }

    }

    _updateAESKey() {
        if (!this.OTP.open || this.OTP.totp.verify(this.OTP.timeCode)) return //未开启OTP或者验证通过，直接取原来的key
        this.OTP.timeCode = this.OTP.totp.now();
        this.AES.key = MD5(this.AES.key_original + this.OTP.timeCode);
    }
    _parseReqData(data) {

        try {
            if (this.regMessage.test(data)) {
                var i = data.indexOf("{");
                return {
                    command: parseInt(data.substr(0, i)),
                    data: JSON.parse(data.substr(i))
                };
            } else {
                let array = data.split(".");
                let command = array[0];
                let dataArr = array[1].split("|");
                let key = dataArr[0].trim(),
                    iv = dataArr[1].trim(),
                    salt = dataArr[2].trim();
                return {
                    command,
                    data: {
                        salt,
                        key,
                        iv,
                        code: 0,
                    }
                };
            }
        } catch (error) {
            this._printLog("websocket: parse json err!");
            return null;
        }
    }
    _printLog(data) {
        console.info(data)
    }
}

export {
    Service
};
function getBrowerInfo() {
    let browser = (function (window) {
        let document = window.document;
        let navigator = window.navigator;
        let agent = navigator.userAgent.toLowerCase();
        // IE8+支持.返回浏览器渲染当前文档所用的模式
        // IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
        // IE10:10(兼容模式7||8||9)
        let IEMode = document.documentMode;
        let chrome = window.chrome || false;
        let system = {
            // user-agent
            agent: agent,
            // 是否为IE
            isIE: /trident/.test(agent),
            // Gecko内核
            isGecko: agent.indexOf('gecko') > 0 && agent.indexOf('like gecko') < 0,
            // webkit内核
            isWebkit: agent.indexOf('webkit') > 0,
            // 是否为标准模式
            isStrict: document.compatMode === 'CSS1Compat',
            // 是否支持subtitle
            supportSubTitle: function () {
                return 'track' in document.createElement('track');
            },
            // 是否支持scoped
            supportScope: function () {
                return 'scoped' in document.createElement('style');
            },

            // 获取IE的版本号
            ieVersion: function () {
                let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
                let match = rMsie.exec(agent);
                try {
                    return match[2];
                } catch (e) {
                    return IEMode;
                }
            },
            // Opera版本号
            operaVersion: function () {
                try {
                    if (window.opera) {
                        return agent.match(/opera.([\d.]+)/)[1];
                    } else if (agent.indexOf('opr') > 0) {
                        return agent.match(/opr\/([\d.]+)/)[1];
                    }
                } catch (e) {
                    return 0;
                }
            }
        };

        try {
            // 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
            system.type = system.isIE ? 'IE' :
                window.opera || (agent.indexOf('opr') > 0) ? 'Opera' :
                (agent.indexOf('chrome') > 0) ? 'Chrome' :
                //safari也提供了专门的判定方式
                window.openDatabase ? 'Safari' :
                (agent.indexOf('firefox') > 0) ? 'Firefox' :
                'unknow';

            // 版本号
            system.version = (system.type === 'IE') ? system.ieVersion() :
                (system.type === 'Firefox') ? agent.match(/firefox\/([\d.]+)/)[1] :
                (system.type === 'Chrome') ? agent.match(/chrome\/([\d.]+)/)[1] :
                (system.type === 'Opera') ? system.operaVersion() :
                (system.type === 'Safari') ? agent.match(/version\/([\d.]+)/)[1] :
                '0';

            // 浏览器外壳
            system.shell = function () {
                if (agent.indexOf('edge') > 0) {
                    system.version = agent.match(/edge\/([\d.]+)/)[1] || system.version;
                    return 'Edge';
                }
                // 遨游浏览器
                if (agent.indexOf('maxthon') > 0) {
                    system.version = agent.match(/maxthon\/([\d.]+)/)[1] || system.version;
                    return 'Maxthon';
                }
                // QQ浏览器
                if (agent.indexOf('qqbrowser') > 0) {
                    system.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || system.version;
                    return 'QQBrowser';
                }
                // 搜狗浏览器
                if (agent.indexOf('se 2.x') > 0) {
                    return '搜狗浏览器';
                }

                // Chrome:也可以使用window.chrome && window.chrome.webstore判断
                if (chrome && system.type !== 'Opera') {
                    let external = window.external;
                    let clientInfo = window.clientInformation;
                    // 客户端语言:zh-cn,zh.360下面会返回undefined
                    let clientLanguage = clientInfo.languages;

                    // 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                    if (external && 'LiebaoGetVersion' in external) {
                        return 'LBBrowser';
                    }
                    // 百度浏览器
                    if (agent.indexOf('bidubrowser') > 0) {
                        system.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                            agent.match(/chrome\/([\d.]+)/)[1];
                        return 'BaiDuBrowser';
                    }
                    // 360极速浏览器和360安全浏览器
                    if (system.supportSubTitle() && typeof clientLanguage === 'undefined') {
                        let storeKeyLen = Object.keys(chrome.webstore).length;
                        let v8Locale = 'v8Locale' in window;
                        return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                    }
                    return 'Chrome';
                }
                return system.type;
            };

            // 浏览器名称(如果是壳浏览器,则返回壳名称)
            system.name = system.shell();
            // 对版本号进行过滤过处理
            // System.version = System.versionFilter(System.version);

        } catch (e) {
            // console.log(e.message);
        }

        return system;

    })(window);

    if (browser.name == undefined || browser.name == '') {
        browser.name = 'Unknown';
        browser.version = 'Unknown';
    } else if (browser.version == undefined) {
        browser.version = 'Unknown';
    }
    return browser;
}

console.log(getBrowerInfo())

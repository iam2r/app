import axios from 'axios';
export default class Request {
    constructor(options = {}) {
    
        this.AJAX = axios.create(options);

        this.AJAX.interceptors.request.use(this.beforeReq, this.onReqError);

        this.AJAX.interceptors.response.use(this.afterRes, this.onResError);
    }


    beforeReq(config) {
        
        
        return config
    }


    afterRes(response) {
        return response.data
    }

    onReqError(error) {
        if (error) {
            console.error(error)
        }
        return Promise.reject(error);
    }

    onResError(error) {
        if (error && error.response) {
            console.error(error.response)
        }
        return Promise.reject(error);
    }

    get(url, param = {}, headers = {}) {
        return this.AJAX.get(url, {
            params: param,
            headers,
        })
    }
    post(url, param = null, headers = {}) {
        return this.AJAX.post(url, param, {
            headers,
        })
    }
    put(url, param = null, headers = {}) {
        return this.AJAX.put(url, param, {
            headers,
        })
    }
    file(url, param = null, headers = {}) {
        return this.AJAX.post(url, param, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
            }
        })
    }
    delete(url, param = null, headers = {}) {
        return this.AJAX.delete(url, {
            param,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
            }
        })
    }
}
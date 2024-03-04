import axios from 'axios';

class AbstractApi {
    constructor(defaultUrl = 'http://localhost:8000', customHeaders = {}, multipart = false) {
        this._defaultUrl = defaultUrl;
        this._defaultHeaders = {...this._getHeadersWithCsrf(), ...customHeaders};

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        this._accessToken = localStorage.getItem('token');
        this.multipart = multipart;

        this._instance = axios.create({
            baseURL: this._defaultUrl,
            headers: this._defaultHeaders,
        });

        if (this._accessToken) {
            this.setAuthorizationToken(this._accessToken);
        }
    }

    async post(endpoint, data = null, headers = {}, customUrl = null, withCredentials = true, multipart = false) {
        try {
            const response = await this._instance.post(customUrl || endpoint, data, {
                headers: {...this._getHeadersWithCsrf(), ...headers},
                maxRedirects: 0,
                withCredentials: withCredentials,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(endpoint, data = null, headers = {}, customUrl = null, withCredentials = true) {
        try {
            const response = await this._instance.delete(customUrl || endpoint, {
                data: data,
                headers: {...this._getHeadersWithCsrf(), ...headers},
                maxRedirects: 0,
                withCredentials: withCredentials,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async get(endpoint, params = {}, headers = {}) {
        try {
            const response = await this._instance.get(endpoint, {
                params: params,
                headers: {...this._getHeadersWithCsrf(), ...headers},
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put(endpoint, data = null, headers = {}, customUrl = null, withCredentials = true) {
        try {
            const response = await this._instance.put(customUrl || endpoint, data, {
                headers: {...this._getHeadersWithCsrf(), ...headers},
                maxRedirects: 0,
                withCredentials: withCredentials,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    setAuthorizationToken(token) {
        this._instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    removeAuthorizationToken() {
        delete this._instance.defaults.headers.common['Authorization'];
    }


    _getHeadersWithCsrf() {
        const csrfToken = csrfCookie();
            const contentType = this.multipart ? 'multipart/form-data' : 'application/json';
        return {
            'X-CSRFToken': csrfToken,
            'Content-Type': contentType,
        };
    }
}

const csrfCookie = function () {
    let cookieValue = null,
        name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export default function Api(options = {}) {
    const { defaultUrl = 'http://localhost:8000', customHeaders = {}, multipart = false } = options;
    return new AbstractApi(defaultUrl, customHeaders, multipart);
}

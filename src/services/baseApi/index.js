import axios from 'axios';
import applyProcessToken, { requestInterceptor } from './interceptors';
/**
 * Create an Axios with defaults
 */
const DEVELOPMENT_BASE_URL = import.meta.env.VITE_BASE_GATEWAY;

const axiosRequestConfig = {
    baseURL: DEVELOPMENT_BASE_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
};
const axiosInstance = axios.create(axiosRequestConfig);
axiosInstance.interceptors.request.use(requestInterceptor);
applyProcessToken(axiosInstance)

/**
 * Request Wrapper with default success/error actions
 */
const _onSuccess = function(response) {
    console.debug('Request Successful!', response);
    return response;
};

const _onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error('Status:',  error.response.status);
        console.error('Data:',    error.response.data);
        console.error('Headers:', error.response.headers);

    } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error('Error Message:', error.message);
    }

    return Promise.reject(error);
};

const _get = function (url, config) {
    return axiosInstance.get(url, config)
        .then(_onSuccess)
        .catch(_onError);
};

const _create = function (url, requestBody) {
    return axiosInstance.post(url, {
        ...requestBody //request body send to sever-side must be a obj
    })
        .then(_onSuccess)
        .catch(_onError);
};

const _update = function (url, requestBody) {
    return axiosInstance.put(url, {
        ...requestBody //request body send to sever-side must be a obj
    })
        .then(_onSuccess)
        .catch(_onError);
};

const _delete = function (url) {
    return axiosInstance.delete(url)
        .then(_onSuccess)
        .catch(_onError);
};

const callApi = {
    axiosInstance,
    get: _get,
    post: _create,
    update: _update,
    delete: _delete
};
export default callApi;


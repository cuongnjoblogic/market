import {handleRemoveIdentityToken, handleSetIdentityToken} from "./handleIdentityToken.js";
import {CLIENT_ID, STORAGE_KEY} from "../../utils/const.js";
import axios from "axios";
import {buildAuthorizationUrl} from "../../utils/index.js";

export const requestInterceptor = (config) => {
    const identityToken = localStorage.getItem(STORAGE_KEY.IDENTITY_ACCESS_TOKEN);
    const appToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    if (identityToken) {
        config.headers.set('Authorization', `Bearer ${identityToken}`);
    }
    if (appToken) {
        config.headers.set('Authorization-App-Token', appToken);
    }
    return config;
};

const shouldIntercept = (error) => {
    try {
        return error.response.status === 401
    } catch (e) {
        return false;
    }
};

const setTokenData = (tokenData = {}) => {
    handleSetIdentityToken(tokenData)
};

const handleTokenRefresh = () => {
    return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem(STORAGE_KEY.IDENTITY_REFRESH_TOKEN);
        if (refreshToken) {
            const payload = {
                grant_type: 'refresh_token',
                client_id: CLIENT_ID,
                refresh_token: refreshToken
            };
            const IDENTITY_URL = import.meta.env.VITE_BASE_IDENTITY;
            axios.post(
                `${IDENTITY_URL}/connect/token`,
                payload,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).then((res) => {
                const resBody = res.data;
                resolve(resBody)
            }).catch(err => {
				handleRemoveIdentityToken();
				const authorizationUrl = buildAuthorizationUrl();
				window.location.replace(authorizationUrl);
            });
        } else {
            handleRemoveIdentityToken();
            const authorizationUrl = buildAuthorizationUrl();
            window.location.replace(authorizationUrl);
        }
    });
};

const applyProcessToken = (axiosClient, customOptions = {}) => {
    let isRefreshing = false;
    let failedQueue = [];

    const options = {
        handleTokenRefresh,
        setTokenData,
        shouldIntercept,
        ...customOptions,
    };
    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    const successInterceptor = (response) => {
        return response;
    };
    const errorInterceptor = (error) => {
        if (!options.shouldIntercept(error)) {
            return Promise.reject(error);
        }

        if (error.config._retry || error.config._queued) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({resolve, reject})
            }).then(() => {
                originalRequest._queued = true;
                return axiosClient.request(originalRequest);
            }).catch(() => {
                return Promise.reject(error); // Ignore refresh token request's "err" and return actual "error" for the original request
            })
        }

        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise((resolve, reject) => {
            options.handleTokenRefresh.call(options.handleTokenRefresh)
                .then((tokenData) => {
                    options.setTokenData(tokenData);
                    processQueue(null, tokenData.access_token);
                    resolve(axiosClient.request(originalRequest), tokenData.access_token);
                })
                .catch((err) => {
                    processQueue(err, null);
                    reject(err);
                })
                .finally(() => {
                    isRefreshing = false;
                })
        });
    };

    axiosClient.interceptors.response.use(successInterceptor, errorInterceptor);
};
export default applyProcessToken;
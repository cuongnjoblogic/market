import {STORAGE_KEY} from "../../utils/const.js";

export const handleSetIdentityToken = (token = {}) => {
    if (token) {
        localStorage.setItem(STORAGE_KEY.IDENTITY_ACCESS_TOKEN, token.access_token);
        localStorage.setItem(STORAGE_KEY.IDENTITY_REFRESH_TOKEN, token.refresh_token);
        localStorage.setItem(STORAGE_KEY.IDENTITY_ID_TOKEN, token.id_token);
    }
};

export const handleRemoveIdentityToken = () => {
    localStorage.removeItem(STORAGE_KEY.IDENTITY_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.IDENTITY_REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEY.IDENTITY_ID_TOKEN);
};
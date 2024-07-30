import {STORAGE_KEY} from "../../utils/const.js";

export const handleSetAppToken = (accessToken = '') => {
    if (accessToken) {
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
    }
};

export const handleRemoveAppToken = () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
};
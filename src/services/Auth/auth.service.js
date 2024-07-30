import axios from "axios";
import { PUBLIC_ROUTE_PATHS, STORAGE_KEY, CLIENT_ID } from "../../utils/const.js";
import {handleRemoveIdentityToken, handleSetIdentityToken} from "../baseApi/handleIdentityToken.js";

const IDENTITY_URL = import.meta.env.VITE_BASE_IDENTITY;

export const getIdentityToken = async ({code, scope, state}) => {
    try {
        localStorage.setItem(STORAGE_KEY.SESSION_STATE, state);
        const verifier = localStorage.getItem(STORAGE_KEY.CODE_VERIFIER);
        const payload = {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            redirect_uri: `${window.location.origin}${PUBLIC_ROUTE_PATHS.AUTH_CALLBACK}`,
            code: code,
            scope: scope,
            code_verifier: verifier
        };
        const res = await axios.post(
            `${IDENTITY_URL}/connect/token`,
            payload,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        );
        const resBody = res.data;
        handleSetIdentityToken(resBody);
        return resBody;
    } catch (error) {
        handleRemoveIdentityToken();
        throw error.response?.data;
    }
};

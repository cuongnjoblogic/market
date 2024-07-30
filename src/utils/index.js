import CryptoES from 'crypto-es';
import { PUBLIC_ROUTE_PATHS, STORAGE_KEY, CLIENT_ID } from './const';

const base64URL = (str) => {
    return str
        .toString(CryptoES.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export const getPkceChallenge = () => {
    const rand = new Uint8Array(32);
    crypto.getRandomValues(rand);
    const verifier = base64URL(CryptoES.lib.WordArray.create(rand));
    const challenge = base64URL(CryptoES.SHA256(verifier));
    return { verifier, challenge };
};

export const buildAuthorizationUrl = () => {
    const IDENTITY_URL = import.meta.env.VITE_BASE_IDENTITY;
    const { verifier, challenge } = getPkceChallenge();
    localStorage.setItem(STORAGE_KEY.CODE_VERIFIER, verifier);

    const authorizationData = {
        client_id: CLIENT_ID,
        redirect_uri: `${window.location.origin}${PUBLIC_ROUTE_PATHS.AUTH_CALLBACK}`,
        response_type: 'code',
        scope: 'openid profile email offline_access',
        code_challenge: challenge,
        code_challenge_method: 'S256'
    };
    const authorizationParams = new URLSearchParams(authorizationData);
    const authorizationUrl = `${IDENTITY_URL}/connect/authorize`;
    return `${authorizationUrl}?${authorizationParams}`;
};

export const buildEndSessionUrl = (idToken) => {
    const endSessionData = {
        client_id: CLIENT_ID,
        id_token_hint: idToken || '',
        post_logout_redirect_uri: window.location.origin
    };
    const endSessionParams = new URLSearchParams(endSessionData);
    const IDENTITY_URL = import.meta.env.VITE_BASE_IDENTITY;
    const authorizationUrl = `${IDENTITY_URL}/connect/endsession`;
    return `${authorizationUrl}?${endSessionParams}`;
};

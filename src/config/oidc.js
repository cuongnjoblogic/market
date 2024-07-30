export const oidcSettings = {
    // "accessTokenExpiringNotificationTime": 3570,
    "authority": import.meta.env.VITE_BASE_IDENTITY,
    // "clientSecret": "SubContractorDev",
    "clientId": "SubContractor",
    "redirectUri": `${import.meta.env.VITE_BASE_URL}/auth/callback`,
    "responseType": "code",
    "scope": "openid profile offline_access email",
    "prompt": "login",
    "automaticSilentRenew": true,
    "automaticSilentSignin": false,
    "silentRedirectUri": `${import.meta.env.VITE_BASE_URL}/auth/silent-signin`,
    "postLogoutRedirectUri": import.meta.env.VITE_BASE_URL,
};

export const APP_TOKEN_KEY = 'app_access_token';
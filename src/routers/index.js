import Vue from 'vue'
import Router from 'vue-router'
import OidcCallback from "../views/OidcCallback.vue";
import OidcPopupCallback from "../views/OidcPopupCallback.vue";
import OidcCallbackError from "../views/OidcCallbackError.vue";
// import {buildAuthorizationUrl} from "../utils/index.js";
import {PUBLIC_ROUTE_PATHS, STORAGE_KEY} from "../utils/const.js";
import Company from "../views/Company.vue";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'customer-list',
            component: () => import(/* webpackChunkName: "protected" */ '../views/Customer/CustomerList.vue'),
            meta: { layout: 'Public' }
        },
        {
            path: PUBLIC_ROUTE_PATHS.AUTH_CALLBACK, // Needs to match redirectUri in you oidcSettings
            name: 'oidcCallback',
            component: OidcCallback
        },
        {
            path: '/oidc-popup-callback', // Needs to match popupRedirectUri in you oidcSettings
            name: 'oidcPopupCallback',
            component: OidcPopupCallback
        },
        {
            path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
            name: 'oidcCallbackError',
            component: OidcCallbackError,
            meta: { layout: 'Public' }
        },
        {
            path: PUBLIC_ROUTE_PATHS.COMPANY, // Needs to match redirect_uri in you oidcSettings
            name: 'company',
            component: Company,
            meta: { layout: 'Private' }
        }
    ]
})

// router.beforeEach((to, _, next) => {
    // const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    // const identityToken = localStorage.getItem(STORAGE_KEY.IDENTITY_ACCESS_TOKEN);
    // // TODO: checkValidToken
    // if (!Object.values(PUBLIC_ROUTE_PATHS).includes(to.path) && !(token && identityToken)) {
    //     const authorizationUrl = buildAuthorizationUrl();
    //     window.location.replace(authorizationUrl);
    // } else {
    //     next();
    // }
// });

export default router
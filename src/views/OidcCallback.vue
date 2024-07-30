<template>
    <div>
    </div>
</template>

<script>

import {getIdentityToken} from "../services/Auth/auth.service.js";
import {PUBLIC_ROUTE_PATHS} from "../utils/const.js";

export default {
    name: 'OidcCallback',
    created () {
        getIdentityToken({
            code: this.$route.query.code,
            scope: this.$route.query.scope,
            state: this.$route.query.session_state,
        }).then(() => {
            this.$router.push(PUBLIC_ROUTE_PATHS.COMPANY)
        })
    }
}
</script>
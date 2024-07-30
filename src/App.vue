<template>
    <div id="app">
        <DefaultLayout>
            <router-view></router-view>
        </DefaultLayout>
    </div>
</template>

<script>

import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
    name: "App",
    components: {
        DefaultLayout
    },
};
</script>

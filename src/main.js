import Vue from "vue";
import './styles/main.scss'
import './lib/jl-components.css'
import App from "./App.vue";
import router from './routers/index.js';
// import store from './stores/authentication.js'

Vue.config.productionTip = false;
Vue.config.devtools = true
const localizePlugin = {
    install(Vue, options) {
        Vue.prototype.t = (str, format, isReplace) => (str, format, isReplace) => str
    },
}
Vue.use(localizePlugin);
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

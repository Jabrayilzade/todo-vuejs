import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {BootstrapVue} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = "http://localhost:5000/api/v1/";
axios.defaults.headers.common['Authorization'] = 'Bearer' + " " + localStorage.getItem('token');

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')

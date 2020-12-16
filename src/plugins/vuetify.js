import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueFuse from 'vue-fuse'

Vue.use(VueFuse);
Vue.use(Vuetify, {
    icons: {
        iconfont: 'mdi' || 'md' || 'fa'
    },
    theme: {
        primary: '#9370DB',
        success: '#33ffbb',
        info: '#ffaa2c',
        error: '#f83e70'
    }
});

export default new Vuetify({});

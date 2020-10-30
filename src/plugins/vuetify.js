import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify, {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        primary: '#9370DB',
        success: '#3cd1c2',
        info: '#ffaa2c',
        error: '#f83e70'
    }
});

export default new Vuetify({});

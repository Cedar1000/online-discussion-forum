import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import TextareaAutosize from 'vue-textarea-autosize';
import VueRouter from 'vue-router';
import Routes from './routes';
import store from './store';
import Vuelidate from 'vuelidate';

require('./store/subscriber');

Vue.config.productionTip = false;

store.dispatch('attempt', localStorage.getItem('token'));

Vue.use(Vuesax);
Vue.use(TextareaAutosize);
Vue.use(VueRouter);
Vue.use(Vuelidate);

export const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

export const bus = new Vue();

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
  router,
}).$mount('#app');

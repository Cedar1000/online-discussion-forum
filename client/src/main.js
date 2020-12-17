import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import TextareaAutosize from 'vue-textarea-autosize';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';
import Routes from './routes';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuesax);
Vue.use(TextareaAutosize);
Vue.use(VueRouter);
Vue.use(VueCookies);

Vue.$cookies.config('7d');

const router = new VueRouter({
  routes: Routes,
});

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
  router,
}).$mount('#app');

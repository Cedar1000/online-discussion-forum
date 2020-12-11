import Vue from 'vue';
import Vuex from 'vuex';
import posts from './modules/posts';

//Load Vuex
Vue.use(Vuex);

//Create Store
export default new Vuex.Store({
  modules: {
    posts,
  },
});

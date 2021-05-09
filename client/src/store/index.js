import Vue from 'vue';
import Vuex from 'vuex';
import posts from './modules/posts';
import auth from './modules/auth';
import postActions from './modules/postActions';
import users from './modules/users';

//Load Vuex
Vue.use(Vuex);

//Create Store
export default new Vuex.Store({
  modules: {
    posts,
    auth,
    postActions,
    users,
  },
});

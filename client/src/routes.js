import store from './store';

import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import Posts from './components/Posts.vue';
import Notifications from './components/Notifications.vue';
import singlePost from './components/singlePost.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Categories from './components/Categories.vue';

export default [
  { path: '/', component: Home },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/posts/:category',
    component: Posts,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/notifications',
    component: Notifications,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/post/:id',
    component: singlePost,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/categories', component: Categories },
];

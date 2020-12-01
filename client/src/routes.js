import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import Posts from './components/Posts.vue';
import Notifications from './components/Notifications.vue';

export default [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/posts', component: Posts },
  { path: '/notifications', component: Notifications },
];

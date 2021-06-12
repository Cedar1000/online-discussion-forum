import axios from 'axios';
import { router } from '../../main';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const state = {
  user: null,
  token: null,
  errorMsg: '',
  notifications: '',
};

const getters = {
  isLoggedIn: (state) => state.user,
  currentUser: (state) => state.user,
  errorMsg: (state) => state.errorMsg,
  signUpErrors: (state) => state.signUpErrors,

  nNotifications: (state) => {
    if (state.notifications.length)
      return state.notifications.filter((el) => el.read === false).length;
  },
  Notifications: (state) => state.notifications,
};

const actions = {
  //Login User In
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('/users/login', {
        email,
        password,
      });

      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
      router.push({ path: 'Profile' });
    } catch (error) {
      commit('setError', error.response.data.message);
    }
  },

  async signIn({ commit }, payload) {
    try {
      const response = await axios.post('/users/signup', payload);

      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
      router.push({ path: 'Profile' });
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
      commit('setError', message);
    }
  },

  async logout({ commit }) {
    try {
      commit('logOut');
      router.push({ path: 'login' });
    } catch (error) {
      console.log(error);
    }
  },

  async getUserNotifications({ commit }) {
    const { _id } = this.state.auth.user;
    if (this.state.auth.user) {
      try {
        const response = await axios.get(`/notifications/${_id}`);
        commit('setNotification', response.data.notifications);
      } catch (error) {
        console.log(error.response);
      }
    }
  },

  async attempt({ commit }, token) {
    commit('setToken', token);

    try {
      const response = await axios.get('/users/me');
      commit('setUser', response.data.doc);
    } catch (error) {
      commit('setToken', null);
      commit('setUser', null);
    }
  },

  async patchNotification({ commit }, id) {
    try {
      const response = await axios.patch(`/notifications/${id}`, {
        read: true,
      });
      commit('updateNotification', response.data.notification);
    } catch (error) {
      console.log(error.response);
    }
  },

  async updateMe({ commit }, payload) {
    try {
      const response = await axios.patch('users/updateMe', payload);

      commit('updateUser', response.data.user);
    } catch (error) {
      commit('setError', error.response.data.message);
    }
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setToken: (state, token) => (state.token = token),
  logOut: (state) => {
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
  },
  setNotification: (state, notifications) =>
    (state.notifications = notifications),

  updateNotification: (state, notification) => {
    state.notifications.find((el) => el.id === notification.id).read = true;
  },

  updateUser: (state, updatedUser) => (state.user = updatedUser),

  setError: (state, errorMsg) => (state.errorMsg = errorMsg),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

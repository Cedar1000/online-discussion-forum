import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  user: '',
  token: null,
  errorMsg: '',
  notifications: '',
};

const getters = {
  isLoggedIn: (state) => state.user,
  currentUser: (state) => state.user,
  nNotifications: (state) => state.notifications.length,
  Notifications: (state) => state.notifications,
};

const actions = {
  //Login User In
  async login({ commit }, { email, password }) {
    try {
      console.log(email, password);
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      console.log(response);

      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  async signIn({ commit }, { name, email, gender, password, passwordConfirm }) {
    try {
      console.log(name, email, gender, password, passwordConfirm);
      const response = await axios.post(`${API_URL}/users/signup`, {
        name,
        email,
        gender,
        password,
        passwordConfirm,
      });

      console.log(response);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  async logout({ commit }) {
    try {
      await axios.get(`${API_URL}/users/logout`);
      commit('logOut');
    } catch (error) {
      console.log(error);
    }
  },

  async getUserNotifications({ commit }) {
    const { _id } = this.state.auth.user;
    if (this.state.auth.user) {
      try {
        const response = await axios.get(`${API_URL}/notifications/${_id}`);
        commit('setNotification', response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    }
  },

  async attempt({ commit }, token) {
    commit('setToken', token);

    try {
      const response = await axios.get(`${API_URL}/users/me`);
      commit('setUser', response.data.doc);
    } catch (error) {
      commit('setToken', null);
      commit('setUser', null);
    }
  },

  async patchNotification({ commit }, id) {
    try {
      const response = await axios.patch(`${API_URL}/notifications/${id}`);
      commit('updateNotification', response.data.notification);
    } catch (error) {
      console.log(error.response);
    }
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setToken: (state, token) => (state.token = token),
  logOut: (state) => {
    state.user = null;
    state.token = null;
    console.log(state.user, state.token);
  },
  setNotification: (state, notifications) =>
    (state.notifications = notifications),

  updateNotification: (state, notification) => {
    state.notifications.find((el) => el.id === notification.id).read = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

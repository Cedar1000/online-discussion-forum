import axios from 'axios';
import cookie from 'vue-cookies';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  user: '',
  token: cookie.get('jwt') || null,
  errorMsg: '',
};

const getters = {
  isLoggedIn: (state) => state.user,
  currentUser: (state) => state.user,
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

      cookie.set('jwt', response.data.token);
      console.log(cookie.get('jwt'));

      // console.log(document.cookie);
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
      cookie.set('jwt', '');
      console.log(cookie.get('jwt'));
    } catch (error) {
      console.log(error);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};

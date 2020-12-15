import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  user: '',
  token: '',
  errorMsg: '',
};

const getters = {};

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
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setToken: (state, token) => (state.token = token),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

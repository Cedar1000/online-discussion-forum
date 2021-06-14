import axios from 'axios';
import { EDIT } from '../factory';

axios.defaults.baseURL = 'https://chatforum.netlify.app/v1';

const state = {
  users: '',
  successMessage: '',
};

const getters = {
  users: (state) => state.users,
  successMessage: (state) => state.successMessage,
  nUsers: (state) => state.users.length,
};

const actions = {
  async getAllUsers({ commit }) {
    try {
      const response = await axios.get('/users');
      commit('setUsers', response.data.doc);
    } catch (error) {
      console.log(error.response);
    }
  },

  async makeAdmin({ commit }, id) {
    try {
      const response = await axios.patch(`users/${id}/makeAdmin`);
      commit('setRole', response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  },

  async updatePassword({ commit }, payload) {
    try {
      const response = await axios.patch('users/updateMyPassword', payload);

      commit('updateUser', response.data.user);
      commit('showMessage', 'Password Succesfully Changed!');
    } catch (error) {
      commit('setError', error.response.data.message);
    }
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),

  setRole: (state, user) => {
    EDIT(state.users, user);
  },

  showMessage: (state, message) => {
    state.successMessage = message;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

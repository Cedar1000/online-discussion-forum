import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const state = {};

const getters = {};

const actions = {
  async likePost({ commit, rootState }, id) {
    try {
      const response = axios.post(`posts/${id}/likes`);
      console.log(response);
      commit('addLike', { id, rootState });
    } catch (error) {
      console.log(error.response);
    }
  },
};

const mutations = {
  addLike: function(state, payload) {
    const { categoryPosts } = payload.rootState.posts;
    console.log(categoryPosts, payload.id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

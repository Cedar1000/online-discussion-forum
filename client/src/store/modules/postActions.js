import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const state = {};

const getters = {};

const actions = {
  async likePost({ commit, rootState }, id) {
    try {
      const response = await axios.post(`posts/${id}/likes`);
      console.log(response);
      commit('addLike', { id, rootState, newLike: response.data.likePoped });
    } catch (error) {
      console.log(error.response);
    }
  },
};

const mutations = {
  addLike: (state, payload) => {
    const { categoryPosts } = payload.rootState.posts;
    const post = categoryPosts.find((el) => el.id === payload.id);
    post.likesQuantity += 1;
    console.log(payload.newLike);
    post.likes.push(payload.newLike);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

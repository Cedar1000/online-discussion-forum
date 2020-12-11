import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response.data.posts);
      commit('setPosts', response.data.posts);
    } catch (error) {
      console.log(error, 'I am an error');
    }
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  posts: [],
  categories: [],
};

const getters = {
  allPosts: (state) => state.posts,
  allCategories: (state) => state.categories,
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

  async fetchCategories({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/category`);
      console.log(response.data.doc);
      commit('setCategories', response.data.doc);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setCategories: (state, categories) => (state.categories = categories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

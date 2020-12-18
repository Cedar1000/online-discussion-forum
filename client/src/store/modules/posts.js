import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const state = {
  posts: [],
  categories: [],
  categoryPosts: [],
  singlePost: '',
};

const getters = {
  allPosts: (state) => state.posts,
  allCategories: (state) => state.categories,
  allCategoryPosts: (state) => state.categoryPosts,
  presentPost: (state) => state.singlePost,
};

const actions = {
  //Geting all Posts from server
  async fetchPosts({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response.data.posts);
      commit('setPosts', response.data.posts);
    } catch (error) {
      console.log(error, 'I am an error');
    }
  },

  // Getting all post categories from server
  async fetchCategories({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/category`);

      commit('setCategories', response.data.doc);
    } catch (error) {
      console.log(error);
    }
  },

  // Getting Posts based on categories
  async fetchCategoryPosts({ commit }, category) {
    try {
      console.log(category);
      const response = await axios.get(`${API_URL}/category/${category}/posts`);
      console.log(response.data.posts);
      commit('setPostCategories', response.data.posts);
    } catch (error) {
      console.log(error);
    }
  },

  //Get Single Post from server
  async fetchSinglePost({ commit }, id) {
    try {
      console.log(id);
      const response = await axios.get(`${API_URL}/posts/${id}`);
      console.log(response.data.post);
      commit('setSinglePost', response.data.post);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setCategories: (state, categories) => (state.categories = categories),
  setPostCategories: (state, posts) => (state.categoryPosts = posts),
  setSinglePost: (state, post) => (state.singlePost = post),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

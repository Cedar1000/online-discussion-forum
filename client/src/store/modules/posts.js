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
      const response = await axios.get(`${API_URL}/category/${category}/posts`);

      commit('setPostCategories', response.data.posts);
    } catch (error) {
      console.log(error);
    }
  },

  //Get Single Post from server
  async fetchSinglePost({ commit }, id) {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`);
      console.log(response.data.post);
      commit('setSinglePost', response.data.post);
    } catch (error) {
      console.log(error);
    }
  },

  //Add Post
  async addPost({ commit }, post) {
    try {
      const response = await axios.post(`${API_URL}/posts`, post);
      console.log(response.data.postGotBack);
      commit('addPost', response.data.postGotBack);
    } catch (error) {
      console.log(error.response);
    }
  },

  //Delete Post
  async deletePost({ commit }, id) {
    try {
      console.log(id);
      const response = await axios.delete(`${API_URL}/posts/${id}`);
      commit('removePost', id);
    } catch (error) {
      console.log(error.response);
    }
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setCategories: (state, categories) => (state.categories = categories),
  setPostCategories: (state, posts) => (state.categoryPosts = posts),
  setSinglePost: (state, post) => (state.singlePost = post),
  addPost: (state, newPost) => {
    state.categoryPosts.push(newPost);
  },
  removePost: (state, id) =>
    (state.categoryPosts = state.categoryPosts.filter((el) => el._id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

import { CREATE, EDIT, DELETE } from '../factory';

axios.defaults.baseURL = 'http://localhost:3000/api/v1/';

const state = {
  posts: [],
  categories: [],
  categoryPosts: [],
  singlePost: '',
  pages: null,
};

const getters = {
  allPosts: (state) => state.posts,
  allCategories: (state) => state.categories,
  allCategoryPosts: (state) => state.categoryPosts,
  presentPost: (state) => state.singlePost,
  pages: (state) => state.pages,
};

const actions = {
  //Geting all Posts from server
  async fetchPosts({ commit }) {
    try {
      const response = await axios.get(`posts`);
      console.log(response.data.posts);
      commit('setPosts', response.data.posts);
    } catch (error) {
      console.log(error.response, 'I am an error');
    }
  },

  // Getting all post categories from server
  async fetchCategories({ commit }) {
    try {
      const response = await axios.get(`category`);

      commit('setCategories', response.data.doc);
    } catch (error) {
      console.log(error);
    }
  },

  // Getting Posts based on categories
  async fetchCategoryPosts({ commit }, { category, page, appendPost }) {
    try {
      const response = await axios.get(
        `category/${category}/posts?page=${page}`
      );

      const { posts, pages } = response.data;

      if (appendPost) {
        commit('appendPosts', response.data.posts);
      } else {
        commit('setPostCategories', { posts, pages });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //Get Single Post from server
  async fetchSinglePost({ commit }, id) {
    try {
      const response = await axios.get(`posts/${id}`);

      commit('setSinglePost', response.data.post);
    } catch (error) {
      console.log(error);
    }
  },

  //Add Post
  addPost({ commit }, post) {
    // console.log(commit, post);
    commit('addPost', post);
  },

  //Delete Post
  async deletePost({ commit }, id) {
    try {
      await axios.delete(`posts/${id}`);
      commit('removePost', id);
    } catch (error) {
      console.log(error.response);
    }
  },

  //Edit Post
  async editPost({ commit }, { id, body }) {
    try {
      const response = await axios.patch(`posts/${id}`, { body });

      commit('editPost', response.data.postGotBack);
    } catch (error) {
      console.log(error);
    }
  },

  async addCategory({ commit }, name) {
    try {
      const response = await axios.post('category', name);

      commit('addCategory', response.data.doc);
    } catch (error) {
      console.log(error.response);
    }
  },

  //Edit category
  async updateCategory({ commit }, { id, name }) {
    try {
      const response = await axios.patch(`category/${id}`, { name });
      commit('setCategory', response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  },

  //Delete Category
  async deleteCategory({ commit }, id) {
    try {
      await axios.delete(`category/${id}`);
      commit('deleteCategory', id);
    } catch (error) {
      console.log(error.response);
    }
  },

  async deleteTyping({ commit }, id) {
    commit('removeTyping', id);
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),

  setCategories: (state, categories) => (state.categories = categories),

  setPostCategories: (state, { posts, pages }) => {
    state.categoryPosts = posts;
    state.pages = pages;
  },

  setSinglePost: (state, post) => (state.singlePost = post),

  addPost: (state, newPost) => {
    //Check if it's a typing event
    if (newPost.typing) {
      //Check if it's already in the state
      const found = state.categoryPosts.find(
        (post) => post.user.id === newPost.user.id
      );

      if (!found) state.categoryPosts.push(newPost);
    } else {
      //Push it anyways
      state.categoryPosts.push(newPost);
    }
  },

  removePost: (state, id) =>
    (state.categoryPosts = state.categoryPosts.filter((el) => el._id !== id)),

  editPost: (state, post) => {
    state.singlePost.body = post.body;
  },

  addCategory: (state, category) => {
    CREATE(state.categories, category);
  },

  appendPosts: (state, newPosts) => {
    console.log(newPosts);
    const modifiedState = [...newPosts, ...state.categoryPosts];
    state.categoryPosts = modifiedState;
  },

  setCategory: (state, category) => {
    EDIT(state.categories, category.data);
  },

  deleteCategory: (state, id) => {
    state.categories = DELETE(state.categories, id);
  },

  removeTyping: (state, id) => {
    const index = state.categoryPosts.findIndex(
      (post) => post.user.id === id && post.typing
    );

    state.categoryPosts.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const state = {};

const getters = {};

const actions = {
  //Like A Post
  async likePost({ commit, rootState }, id) {
    try {
      const response = await axios.post(`posts/${id}/likes`);
      commit('addLike', { id, rootState, newLike: response.data.likePoped });
    } catch (error) {
      console.log(error.response);
    }
  },

  //Dislike A Post
  async dislikePost({ commit, rootState }, { postId, likeId }) {
    console.log(postId, likeId);
    try {
      await axios.delete(`likes/${likeId}`);
      commit('removeLike', { likeId, postId, rootState });
    } catch (error) {
      console.log(error.response);
    }
  },
};

// Add like to state
const mutations = {
  addLike: (state, payload) => {
    const { categoryPosts } = payload.rootState.posts;
    const post = categoryPosts.find((el) => el.id === payload.id);
    post.likesQuantity += 1;
    post.likes.push(payload.newLike);
  },

  //Remove like from state
  removeLike: (state, payload) => {
    const { categoryPosts } = payload.rootState.posts;
    const post = categoryPosts.find((el) => el.id === payload.postId);
    post.likesQuantity -= 1;
    post.likes = post.likes.filter((el) => el.id !== payload.likeId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

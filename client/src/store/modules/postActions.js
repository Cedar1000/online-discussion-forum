import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const state = {};

const getters = {};

const actions = {
  //Like A Post
  async likePost({ commit, rootState }, { id, presentPost }) {
    console.log(id);
    try {
      const response = await axios.post(`posts/${id}/likes`);
      if (!presentPost) {
        commit('addLike', { id, rootState, newLike: response.data.likePoped });
      } else {
        commit('likePresentPost', {
          id,
          rootState,
          newLike: response.data.likePoped,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  //Dislike A Post
  async dislikePost({ commit, rootState }, { postId, likeId }) {
    try {
      await axios.delete(`likes/${likeId}`);
      commit('removeLike', { likeId, postId, rootState });
    } catch (error) {
      console.log(error.response);
    }
  },

  async dislikePresentPost({ commit, rootState }, { likeId }) {
    console.log(likeId);
    try {
      await axios.delete(`likes/${likeId}`);
      commit('unlikePresentPost', { likeId, rootState });
    } catch (error) {
      console.log(error.response);
    }
  },

  //Comment on A post
  async commentOnPost({ commit, rootState }, { postId, comment }) {
    try {
      const response = await axios.post(`posts/${postId}/comments`, {
        body: comment,
      });

      commit('addComment', {
        rootState,
        newComment: response.data.comment,
      });
    } catch (error) {
      console.log(error.response);
    }
  },

  //LIke A Comment
  async likeComment({ commit, rootState }, id) {
    try {
      const response = await axios.post(`comments/${id}/likes`);

      commit('likeComment', {
        rootState,
        commentId: id,
        commentLike: response.data.doc,
      });
    } catch (error) {
      console.log(error.response);
    }
  },

  //Dislike A Comment
  async dislikeComment({ commit, rootState }, { commentId, likeId }) {
    try {
      await axios.delete(`comments/${commentId}/likes/${likeId}`);

      commit('dislikeComment', { rootState, commentId, likeId });
    } catch (error) {
      console.log(error.response);
    }
  },

  //Reply Comment
  async replyComment({ commit, rootState }, { id, body }) {
    try {
      const response = await axios.post(`comments/${id}/reply`, { body });

      commit('addReply', { rootState, id, reply: response.data.doc });
    } catch (error) {
      console.log(error);
    }
  },
};

//Mutations
const mutations = {
  // Add like to state
  addLike: (state, payload) => {
    const { categoryPosts } = payload.rootState.posts;
    const post = categoryPosts.find((el) => el.id === payload.id);
    post.likesQuantity += 1;
    post.likes.push(payload.newLike);
  },

  likePresentPost: (state, payload) => {
    console.log(payload);
    const { singlePost } = payload.rootState.posts;
    singlePost.likesQuantity += 1;
    singlePost.likes.push(payload.newLike);
  },

  //Remove like from state
  removeLike: (state, payload) => {
    const { categoryPosts } = payload.rootState.posts;
    const post = categoryPosts.find((el) => el.id === payload.postId);
    post.likesQuantity -= 1;
    post.likes = post.likes.filter((el) => el.id !== payload.likeId);
  },

  unlikePresentPost: (state, payload) => {
    console.log(payload);
    const { singlePost } = payload.rootState.posts;
    singlePost.likes = singlePost.likes.filter(
      (el) => el._id !== payload.likeId
    );

    console.log(singlePost.likes);
    singlePost.likesQuantity -= 1;
  },

  //Add comment to state
  addComment: (state, payload) => {
    const { singlePost } = payload.rootState.posts;

    singlePost.commentsQuantity += 1;
    singlePost.comments.push(payload.newComment);
  },

  //Add Like to Comment
  likeComment: (state, payload) => {
    const { singlePost } = payload.rootState.posts;

    const comment = singlePost.comments.find(
      (comment) => comment.id === payload.commentId
    );

    comment.likesQuantity += 1;

    comment.likes.push(payload.commentLike);
  },

  //Dislike A Comment
  dislikeComment: (state, payload) => {
    const { singlePost } = payload.rootState.posts;

    const comment = singlePost.comments.find(
      (el) => el.id === payload.commentId
    );

    comment.likesQuantity -= 1;
    comment.likes = comment.likes.filter((like) => like._id !== payload.likeId);
  },

  //Add Reply to Comment
  addReply: (state, payload) => {
    const { singlePost } = payload.rootState.posts;

    const comment = singlePost.comments.find(
      (comment) => comment.id === payload.id
    );

    comment.replies.unshift(payload.reply);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

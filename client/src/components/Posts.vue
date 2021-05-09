<template>
  <div class="posts" id="posts">
    <div
      v-for="post in allCategoryPosts"
      :key="post.id"
      class="post"
      :class="{ me: post.user._id === currentUser._id }"
    >
      <vs-avatar
        badge
        circle
        badge-color="success"
        badge-position="bottom-right"
        size="40"
      >
        <img :src="post.user.avatar" alt="" />
      </vs-avatar>
      <vs-card class="card">
        <template #title>
          <span class="post-details"
            ><h3>{{ post.user.name }}</h3>
            <b>5 mins ago</b></span
          >
        </template>

        <template #text>
          <router-link :to="`/post/${post.id}`">
            <p>
              {{ post.body }}
            </p>
          </router-link>
          <div class="action-div">
            <div class="actions">
              <span>
                <span
                  v-show="post.likes && hasLiked(currentUser._id, post.likes)"
                  @click="handleDislike(post)"
                >
                  <i class="fas fa-heart liked"></i>
                </span>
                <span
                  v-show="!hasLiked(currentUser._id, post.likes)"
                  @click="sendLikeReq(post._id)"
                >
                  <i class="far fa-heart"></i> </span
                ><b>{{ post.likesQuantity }}</b></span
              >
              <span
                ><i class="far fa-comment"></i
                ><b>{{ post.commentsQuantity }}</b></span
              >

              <span
                v-if="post.user._id === currentUser._id"
                @click="editPost(post)"
                ><i class="far fa-user"></i
              ></span>
            </div>
            <span
              v-if="post.user._id === currentUser._id"
              @click="sendDelReq(post._id)"
              ><i class="fas fa-trash"></i
            ></span>
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapGetters, mapActions } from 'vuex';
import { bus } from '../main';

const socket = io('http://localhost:3000', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

export default {
  name: 'Posts',
  data() {
    return {
      param: this.$route.params.category,
      path: this.$route.fullPath,
    };
  },

  methods: {
    ...mapActions([
      'fetchCategoryPosts',
      'deletePost',
      'likePost',
      'dislikePost',
    ]),

    sendDelReq(id) {
      this.deletePost(id);
    },

    sendLikeReq(id) {
      this.likePost(id);
    },

    handleDislike(post) {
      const like = post.likes.find(
        (el) => el.user._id === this.currentUser._id
      );

      this.dislikePost({ postId: post._id, likeId: like._id });
    },

    hasLiked(userId, likesArr) {
      const IDs = [];
      likesArr.forEach((el) => IDs.push(el.user._id));
      return IDs.includes(userId);
    },

    editPost(post) {
      bus.$emit('transferPost', post);
    },
  },

  computed: {
    ...mapGetters(['allCategoryPosts', 'currentUser']),

    getPath() {
      this.fetchCategoryPosts(this.$route.params.category);
      return this.$route.params.category;
    },
  },

  mounted() {
    this.fetchCategoryPosts(this.param);

    bus.$on('emitSub', () => {
      const postDiv = document.getElementById('posts');

      postDiv.scrollTop = postDiv.scrollHeight;
    });

    bus.$emit('closeSidebar');
  },

  created() {
    socket.on('welcome', (message) => {
      console.log(message);
    });

    socket.on('chat-message', (message) => {
      console.log('client', message);
    });
  },

  beforeDestroy() {
    socket.off('chat-message');
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  display: flex;
}
.posts {
  padding: 20px;
  flex-direction: row;
  position: relative;
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
}

.post {
  display: flex;
  margin-bottom: 10px;
  font-family: 'Lato', sans-serif;
}

.post p {
  margin-top: 10px;
}

.post .card {
  margin-left: 5px;
  padding-bottom: 5px;
}

.post .card p {
  margin-top: 0;
}
.me {
  flex-flow: row-reverse;
}

b {
  margin-left: 5px;
}
.action-div {
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  width: 50%;
  margin-top: 8px;
  color: #195bff;
  width: 100%;
  justify-content: space-between;
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.liked {
  color: #ef4545;
}

.fa-comment {
  color: #195bff;
}

.post-details {
  display: flex;
  justify-content: space-between;
}

.post-details h3 {
  font-size: 17px;
}

.post-details b {
  font-size: 12px;
}

@media (max-width: 600px) {
  .posts {
    box-shadow: none;
    grid-column: 1/11;

    height: 86vh;
  }
}
</style>

<template>
  <div class="posts" id="posts">
    <div v-for="post in allCategoryPosts" :key="post.id" class="post">
      <vs-avatar
        badge
        circle
        badge-color="success"
        badge-position="bottom-right"
        size="40"
      >
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </vs-avatar>
      <vs-card class="card">
        <template #title>
          <span class="post-details"
            ><h3>{{ post.user.name }}</h3>
            <b>5 mins ago</b></span
          >
        </template>

        <template #text>
          <router-link :to="`posts/${post.id}`">
            <p>
              {{ post.body }}
            </p>
          </router-link>
          <div class="action-div">
            <div class="actions">
              <span
                ><span @click="sendLikeReq(post._id)"
                  ><i class="far fa-heart"></i></span
                ><b>{{ post.likesQuantity }}</b></span
              >
              <span
                ><i class="far fa-comment"></i
                ><b>{{ post.commentsQuantity }}</b></span
              >
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
import { mapGetters, mapActions } from 'vuex';
import { bus } from '../main';

export default {
  name: 'Posts',
  data() {
    return {
      param: this.$route.params.category,
      path: this.$route.fullPath,
    };
  },
  methods: {
    ...mapActions(['fetchCategoryPosts', 'deletePost', 'likePost']),

    sendDelReq(id) {
      this.deletePost(id);
    },

    sendLikeReq(id) {
      this.likePost(id);
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
  width: 65px;
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

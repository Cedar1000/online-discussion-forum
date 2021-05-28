<template>
  <div>
    <div class="posts" @scroll="fetchNewPosts" id="posts">
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
          v-if="!post.broadcast"
        >
          <img :src="post.user.avatar" alt="" />
        </vs-avatar>

        <vs-card v-if="post.body" class="card">
          <template #title>
            <span class="post-details"
              ><h3>{{ post.user.username }}</h3>
              <b>{{ simplifyDate(post.createdAt) }}</b></span
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
              </div>
              <span
                v-if="post.user._id === currentUser._id"
                @click="sendDelReq(post._id)"
                ><i class="fas fa-trash"></i
              ></span>
            </div>
          </template>
        </vs-card>

        <vs-card v-if="post.typing" class="card">
          <template #title> </template>

          <template #text>
            <p style="padding-top: 10px">Typing....</p>
          </template>
        </vs-card>

        <div v-if="post.broadcast" class="broadcast-div">
          <p>{{ post.broadcast }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { mapGetters, mapActions } from 'vuex';
import { bus } from '../main';

export default {
  name: 'Posts',
  data() {
    return {
      path: this.$route.fullPath,
      unread: 0,
      page: 2,
    };
  },

  methods: {
    ...mapActions([
      'fetchCategoryPosts',
      'deletePost',
      'likePost',
      'dislikePost',
      'appendPosts',
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

    simplifyDate(date) {
      // console.log((Date.now() - date));

      return moment(date).fromNow();
    },

    printName(name) {
      console.log(name);
    },

    fetchNewPosts() {
      const postDiv = document.getElementById('posts');

      // console.log(postDiv.scrollHeight - postDiv.scrollTop);

      if (postDiv.scrollTop === 0 && this.page <= this.pages) {
        this.fetchCategoryPosts({
          category: this.$route.params.category,
          page: this.page,
          appendPost: true,
        });
        this.page += 1;
        // postDiv.scrollTop = 50;
      }

      // if (postDiv.scrollTop) return;
    },
  },

  computed: {
    ...mapGetters(['allCategoryPosts', 'currentUser', 'pages']),

    checkRoute() {
      return this.$route.params.category;
    },
  },

  watch: {
    // allCategoryPosts() {
    //   const postDiv = document.getElementById('posts');

    //   console.log(postDiv.scrollTop, postDiv.scrollHeight);
    // },

    checkRoute() {
      this.page = 2;
    },
  },

  mounted() {
    this.$nextTick(() => console.log('DOM Channged'));

    bus.$emit('closeSidebar');
  },

  created() {
    this.fetchCategoryPosts({ category: this.$route.params.category });

    bus.$on('newPost', () => (this.nPosts += 1));

    bus.$on('user-join', (message) => {
      console.log(message);
    });

    bus.$on('my-message', () => {
      const postDiv = document.getElementById('posts');

      postDiv.scrollTop = postDiv.scrollHeight;
    });

    bus.$on('recieve-message', () => {
      const postDiv = document.getElementById('posts');

      if (postDiv.scrollHeight - postDiv.scrollTop > 1000) {
        this.unread += 1;
        console.log(this.unread);
      }
    });
  },
};
</script>

<style scoped>
.typing {
  display: flex;
}

.broadcast-div {
  width: 100%;
  text-align: center;
  color: #8c8181;
}

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
  margin-left: 3px;
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

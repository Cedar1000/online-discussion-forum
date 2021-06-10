<template>
  <div>
    <div v-if="loading" class="spinner">
      <half-circle-spinner
        :animation-duration="1000"
        :size="35"
        :color="'#195bff'"
      />
    </div>

    <div v-if="fetchLoading" class="spinner fetch">
      <half-circle-spinner
        :animation-duration="1000"
        :size="35"
        :color="'#195bff'"
      />
    </div>

    <div v-if="!loading" class="posts" @scroll="fetchNewPosts" ref="posts">
      <div
        v-for="post in allCategoryPosts"
        :key="post.id"
        class="post"
        :class="{ me: post.user._id === currentUser._id }"
        ref="postCon"
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

      <div class="unread" v-if="scrollMode">
        <div class="relative">
          <vs-button class="vs-button" circle icon floating>
            <i class="fas fa-angle-down"></i>
          </vs-button>
          <span v-show="unread" class="not-div">{{ unread }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { mapGetters, mapActions } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners';
import { bus } from '../main';

export default {
  name: 'Posts',
  data() {
    return {
      path: this.$route.fullPath,
      page: 2,
      loading: true,
      index: 0,
      fetchLoading: false,
      scrollMode: false,
    };
  },

  components: {
    HalfCircleSpinner,
  },

  methods: {
    ...mapActions([
      'fetchCategoryPosts',
      'deletePost',
      'likePost',
      'dislikePost',
      'appendPosts',
      'makeUnread',
      'makeRead',
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

    isVisible(ele, container) {
      const eleTop = ele.offsetTop;
      const eleBottom = eleTop + ele.clientHeight;

      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      // The element is fully visible in the container
      return (
        (eleTop >= containerTop && eleBottom <= containerBottom) ||
        // Some part of the element is visible in the container
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
      );
    },

    checkUnread(arr, index) {
      let unread = 0;
      arr.forEach((el, i) => {
        if (el === false && i >= index) unread += 1;
      });
      return unread;
    },

    sendRead(index) {
      this.makeRead(index);
    },

    fetchNewPosts() {
      const { posts } = this.$refs;

      console.log(posts.scrollHeight, posts.innerHeight);

      if (posts.scrollTop === 0 && this.page <= this.pages) {
        this.fetchLoading = true;
        this.fetchCategoryPosts({
          category: this.$route.params.category,
          page: this.page,
          appendPost: true,
        });
        this.page += 1;
        posts.scrollTop = 50;
      } else {
        if (posts.scrollTop - posts.scrollHeight > 800) {
          this.scrollMode = false;
        } else {
          this.scrollMode = true;
        }

        this.$refs.postCon.forEach((el, i) => {
          if (this.isVisible(el, posts) && this.allCategoryPosts[i].unread) {
            this.makeRead(i);
          }
        });
      }
    },
  },

  computed: {
    ...mapGetters(['allCategoryPosts', 'currentUser', 'pages', 'unread']),

    checkRoute() {
      return this.$route.params.category;
    },
  },

  watch: {
    checkRoute() {
      this.page = 2;
    },
  },

  beforeUpdate() {
    const { posts } = this.$refs;
    console.log(posts);
    posts.scrollTop = posts.scrollHeight;
  },

  mounted() {
    this.$nextTick(() => {
      this.fetchLoading = false;
      this.loading = false;
      console.log(this.loading);
    });

    bus.$emit('closeSidebar');

    bus.$on('recieve-message', () => {
      const { posts } = this.$refs;
      if (posts.scrollHeight - posts.scrollTop > 1000) {
        this.index = this.allCategoryPosts.length - 1;
        this.makeUnread(this.index);
      }
    });

    bus.$on('my-message', () => {
      const { posts } = this.$refs;
      console.log(posts);
      posts.scrollTop = posts.scrollHeight;
    });

    bus.$on('change-posts', () => (this.loading = true));

    bus.$on('set-posts', () => (this.loading = false));

    bus.$on('append-posts', () => (this.fetchLoading = false));
  },

  created() {
    this.fetchCategoryPosts({ category: this.$route.params.category });
  },
};
</script>

<style scoped>
.unread {
  position: fixed;
  right: 1rem;
  bottom: 7.5rem;
  z-index: 2;
}

.unread .vs-button {
  background: #fff;
  color: #000;
  padding: 8px 10px;
  border-radius: 50%;
}

.spinner {
  display: flex;
  justify-content: center;
}

.fetch {
  z-index: 10;
}

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
  z-index: 1;
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

.not-div {
  height: 30px;
  width: 30px;
  background: #195bff;
  justify-content: center;
  text-align: center;
  align-items: center;
  display: flex;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  z-index: 2;
  position: absolute;
  top: -7px;
  right: -7px;

  border: 2px solid #fff;
}

@media (max-width: 600px) {
  .posts {
    box-shadow: none;
    grid-column: 1/11;

    height: 86vh;
  }
}
</style>

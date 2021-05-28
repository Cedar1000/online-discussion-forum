<template>
  <div>
    <div class="wrapper">
      <router-link :to="`/notifications`"
        ><i class="fas fa-arrow-left"></i
      ></router-link>
      <div v-if="this.presentPost" class="post">
        <!-- user div -->
        <div class="user">
          <vs-avatar size="55" circle class="avatar">
            <img :src="presentPost.user.avatar" alt="" />
          </vs-avatar>

          <div class="post-details">
            <div class="user-stuff">
              <p>
                <b>{{ presentPost.user.name }}</b>
              </p>
              <p class="timestamp">{{ simplifyDate(presentPost.createdAt) }}</p>
            </div>

            <div class="user-actions">
              <span
                v-if="presentPost.user._id === currentUser._id"
                @click="handleEdit"
                ><i class="action-icon fas fa-pencil-alt"></i
              ></span>

              <span
                v-if="presentPost.user._id === currentUser._id"
                @click="editPost(presentPost)"
                ><i class="action-icon fas fa-trash"></i
              ></span>
            </div>
          </div>
        </div>

        <div class="post-content">
          <p>
            {{ presentPost.body }}
          </p>
        </div>
        <div class="actions">
          <span
            ><i class="fas fa-heart"></i
            ><b>{{ presentPost.likesQuantity }}</b></span
          >
          <span
            ><i class="far fa-comment"></i
            ><b>{{ presentPost.commentsQuantity }}</b></span
          >
        </div>

        <vs-dialog
          class="vs-dialogue"
          width="300px"
          not-center
          v-model="active"
        >
          <template #header>
            <h4 class="not-margin">Edit Post <b>Name</b></h4>
          </template>

          <div class="con-content">
            <vs-input v-model="postToEdit" placeholder="Name"></vs-input>
          </div>

          <template #footer>
            <div class="con-footer">
              <div class="btn-section">
                <vs-button @click="sendEdit" transparent>
                  Ok
                </vs-button>
                <vs-button @click="active = false" dark transparent>
                  Cancel
                </vs-button>
              </div>
            </div>
          </template>
        </vs-dialog>
      </div>

      <v-divider class="divider"></v-divider>
      <div class="comment-section">
        <div class="input">
          <textarea-autosize
            placeholder="Write a comment..."
            ref="myTextarea"
            :min-height="10"
            :max-height="350"
            v-model="comment"
          />
          <v-btn
            @click="sendComment"
            class="mx-2 comment-btn"
            fab
            dark
            color="indigo"
          >
            <i class="fas fa-paper-plane"></i>
          </v-btn>
        </div>

        <div class="comments">
          <div
            v-for="comment in presentPost.comments"
            :key="comment.id"
            class="comment"
          >
            <div class="comment-inner">
              <vs-avatar size="35" circle class="avatar">
                <img :src="comment.user.avatar" alt="" />
              </vs-avatar>
              <div class="comment-body">
                <h4>Cedar Daniel</h4>
                <p>
                  {{ comment.body }}
                </p>
                <div class="actions">
                  <div class="wrapper-actions">
                    <span>
                      <span
                        v-show="
                          comment.likes &&
                            hasLiked(currentUser._id, comment.likes)
                        "
                        @click="handleDislike(comment.likes, comment._id)"
                      >
                        <i class="fas fa-heart liked"></i>
                      </span>
                      <span
                        v-show="
                          comment.likes &&
                            !hasLiked(currentUser._id, comment.likes)
                        "
                        @click="sendLikeReq(comment._id)"
                      >
                        <i class="far fa-heart like"></i> </span
                      ><b>{{ comment.likesQuantity }}</b></span
                    >
                    <span @click="toggleReply(comment._id)" class="replies"
                      ><i class="fas fa-reply"></i
                      ><b>{{ comment.replyQuantity }}</b></span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-if="comment.replies && comment.replies.length > 1">
              <div
                class="comment-replies"
                v-for="reply in comment.replies"
                :key="reply._id"
              >
                <div class="comment-inner">
                  <vs-avatar size="35" circle class="avatar">
                    <img
                      src="../assets/images/72571994_111521426928601_2576485395504037888_n.jpg"
                      alt=""
                    />
                  </vs-avatar>
                  <div class="comment-body">
                    <h4>{{ reply.user.name }}</h4>
                    <p>
                      {{ reply.body }}
                    </p>
                    <div class="actions">
                      <div class="wrapper-action">
                        <span><i class="fas fa-heart"></i><b>12</b></span>
                        <span><i class="fas fa-reply"></i><b>5</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-show="replyMode === true && commentToReply === comment.id"
              class="input"
            >
              <textarea-autosize
                placeholder="Reply to this comment..."
                ref="myTextarea"
                :min-height="10"
                :max-height="350"
                v-model="reply"
              />
              <v-btn
                @click="sendReply(comment.id)"
                class="mx-2"
                fab
                dark
                color="indigo"
              >
                <i class="fas fa-paper-plane"></i>
              </v-btn>
            </div>
            <v-divider class="divider"></v-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'singlePost',
  data: () => ({
    id: '',
    comment: '',
    reply: '',
    replyMode: false,
    commentToReply: '',
    active: false,
    postToEdit: '',
  }),

  methods: {
    ...mapActions([
      'fetchSinglePost',
      'commentOnPost',
      'likeComment',
      'dislikeComment',
      'replyComment',
      'editPost',
    ]),

    handleEdit() {
      this.active = true;
      this.postToEdit = this.presentPost.body;
      this.id = this.presentPost.id;
    },

    sendEdit() {
      this.editPost({ id: this.id, body: this.postToEdit });
      this.active = false;
    },

    sendComment() {
      this.commentOnPost({ postId: this.id, comment: this.comment });
      this.comment = '';
    },

    hasLiked(userId, likesArr) {
      const IDs = [];
      likesArr.forEach((el) => IDs.push(el.user));
      return IDs.includes(userId);
    },

    sendLikeReq(id) {
      this.likeComment(id);
    },

    handleDislike(likes, id) {
      const like = likes.find((el) => el.user === this.currentUser._id);

      this.dislikeComment({ commentId: id, likeId: like._id });
    },

    toggleReply(id) {
      const toReply = this.presentPost.comments.find((el) => el.id === id);
      this.replyMode = true;
      this.commentToReply = toReply.id;
    },

    sendReply(id) {
      this.replyComment({ id, body: this.reply });
      this.reply = '';
    },

    simplifyDate(date) {
      // console.log((Date.now() - date));

      return moment(date).fromNow();
    },
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchSinglePost(this.id);
  },

  computed: {
    ...mapGetters(['presentPost', 'currentUser']),
  },
};
</script>

<style scoped>
.con-content {
  font-family: 'Lato', sans-serif;
}

.btn-section {
  display: flex;
}

.action-icon {
  color: #195bff;
}

.user-actions span {
  margin-left: 20px;
}

.divider {
  margin-top: 10px;
}

.replies {
  margin-left: 10px;
}
.actions {
  display: flex;
  justify-content: space-between;
  width: 65px;
}

.like {
  color: #195bff !important;
}
.wrapper {
  padding: 15px;
  font-family: 'Lato', sans-serif;
  overflow: hidden;
  overflow-y: scroll;
  height: 90vh;
}

.fa-arrow-left {
  margin: 15px 0;
  color: #195bff;
}
.user {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user .post-details {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.timestamp {
  color: #616161;
}

.post-content p {
  color: #000000de;
}

.actions {
  display: flex;
  width: 10%;
  justify-content: space-between;
  margin: 10px 0;
  color: #195bff;
}
b {
  margin-left: 2px;
}

.fa-heart {
  color: #ef4545;
}

.input {
  display: flex;
  align-items: center;
  /* display: none; */
}

textarea {
  background: #e0e0e0;
  border-radius: 25px;
  width: 100%;
  padding: 10px;
  height: 40px !important;
  font-family: 'Lato', sans-serif;
  margin-right: 5px;
  overflow: hidden;
  overflow-y: scroll;
}

textarea:focus {
  outline: none;
}

.comment-btn {
  height: 40px !important;
  width: 40px !important;
  background-color: #195bff !important;
}

.fas {
  font-size: 15px;
  margin-left: 5px;
}

.comment-section {
  margin-top: 15px;
}

.comments {
  padding: 15px;
}

.comment-inner {
  display: flex;
  margin-bottom: 15px;
}

.comments p {
  max-width: 450px;
  font-size: 15px;
}

.comment-body {
  background: #e4e6eb;
  padding: 10px 12px;
  border-bottom-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-left-radius: 18px;
  font-family: 'Roboto', sans-serif;
  margin-left: 5px;
}

.comment-body p {
  padding-top: 5px;
}

.comments .actions {
  width: 100%;
  justify-content: flex-end;
  margin-top: 0;
  top: 0;
  position: relative;
  margin-bottom: 0;
}

.wrapper-action {
  background: #fff;
  border-bottom-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-left-radius: 18px;
  padding: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  font-size: 14px;
}

.comment-replies {
  margin-left: 50px;
}

.divider {
  margin-bottom: 15px;
}

.comment {
  padding-top: 15px;
}

@media (max-width: 768px) {
  .actions {
    width: 25%;
  }

  .comments {
    padding: 0;
  }

  .comment-inner {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    margin-bottom: 22px;
  }

  .comment-body {
    grid-column: 2/9;
    margin-left: 0;
  }
}
</style>

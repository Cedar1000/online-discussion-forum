<template>
  <div class="input">
    <textarea-autosize
      placeholder="Type Post here..."
      ref="myTextarea"
      :min-height="20"
      :max-height="650"
      v-model="post.body"
    />
    <v-btn @click="sendPost" class="mx-2" fab dark color="indigo">
      <i class="fas fa-paper-plane"></i>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { bus } from '../main';

export default {
  name: 'addpost',
  data() {
    return {
      post: {
        body: '',
        category: this.$route.params.category,
      },

      edit: false,
    };
  },

  methods: {
    ...mapActions(['addPost', 'editPost']),

    async sendPost() {
      if (this.edit) {
        this.editPost({ id: this.post._id, body: this.post.body });
        this.edit = false;
      } else {
        this.addPost(this.post);
      }
      this.post.body = '';
    },
  },

  created() {
    bus.$on('transferPost', (post) => {
      this.post = post;
      this.edit = true;
    });
  },
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  width: 100%;
}

textarea {
  background: #e0e0e0;
  border-radius: 25px;
  width: 100%;
  padding: 10px;
  height: 40px !important;
  font-family: 'Lato', sans-serif;
  margin-right: 5px;
}

textarea:focus {
  outline: none;
}

button {
  height: 40px !important;
  width: 40px !important;
  background-color: #195bff !important;
}

.fas {
  font-size: 15px;
  margin-left: 5px;
}
</style>

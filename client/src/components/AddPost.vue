<template>
  <div class="input">
    <textarea-autosize
      placeholder="Type Post here..."
      ref="myTextarea"
      :min-height="20"
      :max-height="650"
      v-model="body"
    />
    <v-btn @click="sendMessage" class="mx-2" fab dark color="indigo">
      <i class="fas fa-paper-plane"></i>
    </v-btn>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';
import { bus } from '../main';

const socket = io('https://chatforum.netlify.app', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

export default {
  name: 'addpost',
  data() {
    return {
      user: '',
      body: '',

      edit: false,
    };
  },

  methods: {
    ...mapActions([
      'addPost',
      'editPost',
      'fetchCategoryPosts',
      'deleteTyping',
    ]),

    sendMessage() {
      const post = {
        body: this.body,
        user: this.currentUser._id,
        category: this.$route.params.category,
      };

      socket.emit('chat-message', post);
      this.body = '';
    },
  },

  computed: {
    ...mapGetters(['currentUser']),
  },

  watch: {
    body(value) {
      value
        ? socket.emit('typing', {
            id: this.currentUser._id,
            username: this.currentUser.username,
            avatar: this.currentUser.avatar,
            room: this.$route.params.category,
          })
        : socket.emit('stopTyping', this.currentUser._id);
    },
  },

  mounted() {
    socket.emit('join-room', {
      username: this.currentUser.username,
      room: this.$route.params.category,
    });
  },

  created() {
    bus.$on('change-posts', ({ roomLeaving, category }) => {
      this.fetchCategoryPosts({ category });

      if (roomLeaving) {
        socket.emit('leave-room', {
          username: this.currentUser.username,
          room: roomLeaving,
          id: this.currentUser._id,
        });
      }

      socket.emit('join-room', {
        username: this.currentUser.username,
        room: this.$route.params.category,
      });
    });

    bus.$on('join-room', () => {
      socket.emit('join-room', {
        username: this.currentUser.username,
        room: this.$route.params.category,
      });
    });

    socket.on('chat-message', (message) => this.addPost(message));

    socket.on('typing', (message) => this.addPost(message));

    socket.on('leave-room', (message) => this.addPost(message));

    socket.on('user-join', (message) => this.addPost(message));

    socket.on('stopTyping', (id) => this.deleteTyping(id));

    socket.on('my-message', () => bus.$emit('my-message'));

    socket.on('recieve-message', () => bus.$emit('recieve-message'));
  },

  beforeDestroy() {
    bus.$off('leave-room');
    bus.$off('change-posts');
    socket.off('chat-message');
    socket.off('recieve-message');
    socket.off('user-join');
    socket.off('leave-room');
    socket.off('typing');
  },
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
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

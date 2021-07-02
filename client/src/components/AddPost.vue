<template>
  <div class="wrapper">
    <div class="input">
      <div class="text">
        <textarea
          name="text"
          placeholder="Type a message"
          v-model="body"
        ></textarea>

        <span @click="emojiMode = true"><i class="far fa-laugh icon"></i></span>
      </div>
      <v-btn @click="sendMessage" class="mx-2" fab dark color="indigo">
        <i class="fas fa-paper-plane"></i>
      </v-btn>
    </div>

    <vs-dialog class="vs-dialogue" width="300px" not-center v-model="emojiMode">
      <picker
        @select="addEmoji"
        :style="{ width: '100%', bottom: '20px', right: '20px' }"
      />
    </vs-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { Picker } from 'emoji-mart-vue';
import { mapActions, mapGetters } from 'vuex';
import { bus } from '../main';

const socket = io('https://aqueous-citadel-79441.herokuapp.com', {
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
      emojiMode: false,
      edit: false,
    };
  },

  components: {
    Picker,
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

    addEmoji(emoji) {
      this.body += emoji.native;
    },

    test() {
      console.log('test');
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
.text {
  width: 100%;
  position: relative;
}

textarea {
  position: absolute;
  bottom: -18px;
}

.text .icon {
  position: absolute;
  right: 5%;
  bottom: 50%;
  font-size: 22px;
  color: #100f0f85;
  transform: translateY(40%);
}

/* TEXTAREA STYLES */
.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  display: grid;
}
.grow-wrap::after {
  /* Note the weird space! Needed to preventy jumpy behavior */
  content: attr(data-replicated-value) ' ';

  /* This is how textarea text behaves */
  white-space: pre-wrap;

  /* Hidden from view, clicks, and screen readers */
  visibility: hidden;
}
.grow-wrap > textarea {
  /* You could leave this, but after a user resizes, then it ruins the auto sizing */
  resize: none;

  /* Firefox shows scrollbar on growth, you can hide like this. */
  overflow: hidden;
}
.grow-wrap > textarea,
.grow-wrap::after {
  /* Identical styling required!! */
  border: 1px solid black;
  padding: 0.5rem;
  font: inherit;

  /* Place on top of each other */
  grid-area: 1 / 1 / 2 / 2;
}

body {
  margin: 2rem;
  font: 1rem/1.4 system-ui, sans-serif;
}

label {
  display: block;
}

.wrapper {
  width: 100%;
}

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

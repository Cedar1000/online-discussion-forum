<template>
  <div class="profile-wrapper">
    <div class="user-div">
      <vs-avatar
        v-if="isLoggedIn"
        badge
        circle
        badge-color="success"
        badge-position="bottom-right"
        size="45"
      >
        <img :src="currentUser.avatar" />
      </vs-avatar>
      <span>
        <h4>{{ currentUser.username }}</h4>
        <input
          style="display:none"
          type="file"
          @change="uploadFile"
          ref="fileInput"
        />
        <button
          v-if="!uploading"
          @click="$refs.fileInput.click()"
          class="upload-btn"
        >
          Upload Image
        </button>

        <div v-if="uploading" class="spinner">
          <half-circle-spinner
            :animation-duration="1000"
            :size="15"
            :color="'#195bff'"
          />
        </div>
      </span>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-input">
        <label for="">Name</label>
        <input type="text" placeholder="Name" v-model="payload.name" />
      </div>

      <div class="form-input">
        <label for="">Username </label>
        <input type="text" placeholder="Name" v-model="payload.username" />
      </div>

      <div class="form-input">
        <label for="">Email </label>
        <input type="text" placeholder="Name" v-model="payload.email" />
      </div>

      <div class="form-input">
        <label for="gender">Gender</label>
        <select id="gender">
          <option :value="payload.gender">{{ payload.gender }}</option>
          <option :value="`${payload.gender === 'male' ? 'female' : 'male'}`">{{
            payload.gender === 'male' ? 'female' : 'male'
          }}</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { bus } from '../main';
import { HalfCircleSpinner } from 'epic-spinners';

export default {
  name: 'Profile',
  components: {
    HalfCircleSpinner,
  },

  data: () => ({
    Edit: true,
    uploading: false,
    payload: {
      name: '',
      username: '',
      email: '',
      gender: '',
    },
  }),

  methods: {
    ...mapActions(['updateMe']),

    handleSubmit() {
      this.updateMe(this.payload);
    },

    uploadFile(event) {
      this.uploading = true;

      //Get File From Event
      const selectedFile = event.target.files[0];

      //Create new FormData Object
      const fd = new FormData();

      //Append File and file name to the new FormData
      fd.append('avatar', selectedFile, selectedFile.name);

      this.updateMe(fd);
    },
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn']),
  },

  created() {
    this.payload.name = this.currentUser.name;
    this.payload.username = this.currentUser.username;
    this.payload.email = this.currentUser.email;
    this.payload.gender = this.currentUser.gender;

    bus.$on('stopLoading', () => {
      this.loading = false;
      this.uploading = false;
    });
  },
};
</script>

<style scoped>
.profile-wrapper {
  padding: 15px;
  font-family: 'Lato', sans-serif;
}

.user-div {
  display: flex;
}

.user-div span {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #262626;
}

.user-div span button {
  color: #195bff;
}

form {
  padding: 20px 5px;
}

form input,
form select,
form button {
  padding: 15px 5px;
}

.form-input {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.form-input label {
  margin-bottom: 10px;
}

form button {
  display: block;
  width: 100%;
  background: #195bff;
  color: #fff;
  border-radius: 8px;
}

form input,
form select {
  border: none;
  background: #195bff12;
}
</style>

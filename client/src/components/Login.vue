<template>
  <div>
    <vs-alert v-if="errorMsg" class="vs-alert" color="danger">
      {{ errorMsg }}
    </vs-alert>
    <form class="wrapper" @submit.prevent="loginUser">
      <div class="vs-card">
        <i class="fas fa-user-circle"></i>
        <h3>Login</h3>
        <div class="center content-inputs">
          <i class="far fa-user"></i>
          <input type="text" v-model="email" placeholder="Email" /><br />

          <i class="fas fa-lock"></i>
          <input type="password" v-model="password" placeholder="Password" />

          <v-btn v-if="!loading" rounded class="button" type="submit">
            Login
          </v-btn>

          <div v-if="loading" class="spinner">
            <half-circle-spinner
              :animation-duration="1000"
              :size="35"
              :color="'#195bff'"
            />
          </div>
        </div>
        <div class="links">
          <router-link to="/Register">Sign Up</router-link>
          <a href="#">Forgot Password</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners';
import { bus } from '../main';

export default {
  name: 'Login',

  components: {
    HalfCircleSpinner,
  },

  data: () => ({
    active: 0,
    loading: false,
    email: '',
    password: '',
  }),

  methods: {
    ...mapActions(['login']),

    loginUser() {
      this.loading = true;
      this.login({ email: this.email, password: this.password });
    },
  },

  computed: {
    ...mapGetters(['errorMsg']),
  },

  created() {
    bus.$on('stopLoading', () => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
}

.vs-alert {
  text-align: center;
  widows: 90%;
  display: block;
  margin: 0 auto;
  font-family: 'Lato', sans-serif;
}

.wrapper {
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding: 25px;
  height: 70vh;
  align-items: center;
}

.vs-card {
  padding: 40px 15px;
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fa-user-circle {
  font-size: 55px;
  color: #195bff;
}

.button {
  background-color: #195bff !important;
  color: #fff;
  text-transform: none;
  display: block;
  width: 100%;
}

.content-inputs {
  width: 90%;
  margin-bottom: 10px;
}

.fa-user,
.fa-lock {
  /* position: absolute; */
  margin-bottom: 5px;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  background: #f6f6f6;
  width: 100%;
  border-radius: 20px;
  font-size: 14px;
}

h3 {
  margin-bottom: 10px;
  margin-top: 10px;
}

.links {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 75%;
  font-size: 14px;
}

.links a {
  text-decoration: none;
}
.err-msg {
  font-size: 14px;
  color: red;
  margin-top: 15px;
}
</style>

<template>
  <div>
    <vs-alert v-if="errorMsg" class="vs-alert" color="danger">
      {{ errorMsg }}
    </vs-alert>

    <form class="wrapper" @submit.prevent="signInUser">
      <div class="vs-card">
        <i class="fas fa-user-circle"></i>
        <h3>Sign Up</h3>
        <div class="center content-inputs">
          <vs-input
            type="text"
            v-model="$v.payload.name.$model"
            placeholder="Name"
            :danger="$v.payload.name.$dirty && !$v.payload.name.required"
          /><br />

          <span
            class="error"
            v-if="$v.payload.name.$dirty && !$v.payload.name.required"
          >
            Name is required
          </span>

          <vs-input
            required
            type="text"
            v-model="$v.payload.email.$model"
            placeholder="Email"
            :danger="$v.payload.email.$dirty && !$v.payload.email.required"
          /><br />

          <span
            class="error"
            v-if="$v.payload.email.$dirty && !$v.payload.email.required"
          >
            Email is required
          </span>

          <span class="error" v-if="$v.payload.email.$invalid">
            Email is Invalid
          </span>

          <vs-input
            type="text"
            v-model="$v.payload.username.$model"
            placeholder="Username"
            :danger="
              $v.payload.username.$dirty && !$v.payload.username.required
            "
          /><br />

          <span
            class="error"
            v-if="$v.payload.username.$dirty && !$v.payload.username.required"
          >
            Username is required
          </span>

          <div class="gender">
            <vs-select
              class="vs-select"
              label-placeholder="Gender"
              required
              v-model="$v.payload.gender.$model"
            >
              <vs-option label="Male" value="male">
                Male
              </vs-option>
              <vs-option label="Female" value="female">
                Female
              </vs-option>
            </vs-select>
          </div>

          <div class="password">
            <vs-input
              type="password"
              required
              v-model="$v.payload.password.$model"
              placeholder="Password"
              :danger="
                $v.payload.password.$dirty && !$v.payload.password.required
              "
            />

            <span
              class="error"
              v-if="$v.payload.password.$dirty && !$v.payload.password.required"
            >
              Password is required
            </span>
          </div>

          <div class="password">
            <vs-input
              type="password"
              required
              v-model="$v.payload.passwordConfirm.$model"
              placeholder="Confirm Password"
              :danger="
                $v.payload.passwordConfirm.$dirty &&
                  !$v.payload.passwordConfirm.required
              "
            />

            <span
              class="error"
              v-if="
                $v.payload.passwordConfirm.$dirty &&
                  !$v.payload.passwordConfirm.required
              "
            >
              passwordConfirm is required
            </span>
          </div>

          <v-btn rounded :disabled="invalid" class="button" type="submit">
            Sign Up
          </v-btn>
        </div>
        <div class="links">
          <span>Already have an account?</span>
          <router-link to="/Login">Login</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data: () => ({
    payload: {
      name: '',
      username: '',
      email: '',
      gender: '',
      password: '',
      passwordConfirm: '',
    },
  }),
  validations: {
    payload: {
      name: {
        required,
      },
      username: {
        required,
      },

      email: {
        required,
        email,
      },
      gender: {
        required,
      },

      password: {
        required,
        minLength: minLength(8),
      },
      passwordConfirm: {
        required,
        minLength: minLength(8),
      },
    },
  },

  methods: {
    ...mapActions(['signIn']),

    signInUser() {
      console.log(this.payload);
      this.signIn(this.payload);
    },

    clearFields() {
      this.name = '';
      this.email = '';
      this.gender = '';
      this.password = '';
      this.passwordConfirm = '';
    },
  },
  mounted() {
    console.log(this.$v.payload);
    console.log(this.$v.payload.$anyError);
  },

  computed: {
    ...mapGetters(['errorMsg']),

    invalid() {
      // console.log(this.$v.payload);
      return this.$v.payload.$invalid;
    },
  },
};
</script>

<style scoped>
.vs-alert {
  font-family: 'Lato', sans-serif;
  height: auto;
}

.error {
  display: block;
  position: relative;
  bottom: 10px;
  color: #f57f6c;
}

.inputError {
  width: 100%;
  border-bottom: 2px solid #f57f6c;
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

.gender,
.password {
  margin-bottom: 15px;
}

.vs-select {
  width: 100%;
  font-family: 'Lato', sans-serif;
}

@media (max-width: 360px) {
  .wrapper {
    margin-top: 35px;
    height: 80vh;
  }
}
</style>

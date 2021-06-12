<template>
  <div>
    <vs-alert v-if="errorMsg" class="vs-alert" color="danger">
      {{ errorMsg }}
    </vs-alert>

    <vs-alert v-if="successMessage" class="vs-alert" color="success">
      {{ successMessage }}
    </vs-alert>

    <form class="wrapper" @submit.prevent="sendDetails">
      <div class="vs-card">
        <i class="fas fa-user-circle"></i>
        <h3>Update Password</h3>
        <div class="center content-inputs">
          <div class="password">
            <vs-input
              type="password"
              required
              v-model="$v.payload.passwordCurrent.$model"
              placeholder="Current Password"
              :danger="
                $v.payload.passwordCurrent.$dirty &&
                  !$v.payload.passwordCurrent.required
              "
            />

            <span
              class="error"
              v-if="
                $v.payload.passwordCurrent.$dirty &&
                  !$v.payload.passwordCurrent.required
              "
            >
              Current Password is required
            </span>

            <span
              class="error"
              v-if="
                $v.payload.passwordCurrent.$dirty &&
                  !$v.payload.passwordCurrent.minLength
              "
            >
              Must be a minimum of 8 characters
            </span>
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

            <span
              class="error"
              v-if="
                $v.payload.password.$dirty && !$v.payload.password.minLength
              "
            >
              Must be a minimum of 8 characters
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

            <span
              class="error"
              v-if="
                $v.payload.passwordConfirm.$dirty &&
                  !$v.payload.passwordConfirm.minLength
              "
            >
              Must be a minimum of 8 characters
            </span>
          </div>

          <v-btn
            v-if="!loading"
            rounded
            :disabled="invalid"
            class="button"
            type="submit"
          >
            Sign Up
          </v-btn>

          <div v-if="loading" class="spinner">
            <half-circle-spinner
              :animation-duration="1000"
              :size="35"
              :color="'#195bff'"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import { HalfCircleSpinner } from 'epic-spinners';
import { bus } from '../main';

export default {
  name: 'UpdatePassword',

  components: {
    HalfCircleSpinner,
  },

  data: () => ({
    loading: false,

    payload: {
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    },
  }),

  validations: {
    payload: {
      passwordCurrent: {
        required,
        minLength: minLength(8),
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
    ...mapActions(['updatePassword']),

    sendDetails() {
      this.loading = true;

      this.updatePassword(this.payload);
    },
  },

  computed: {
    ...mapGetters(['errorMsg', 'successMessage']),

    invalid() {
      return this.$v.payload.$invalid;
    },
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
  font-family: 'Lato', sans-serif;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.error {
  display: block;
  position: relative;
  bottom: 10px;
  color: #f57f6c;
  margin-top: 15px;
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

<template>
  <div>
    <div class="wrapper">
      <div class="vs-card">
        <i class="fas fa-user-circle"></i>
        <h3>Login</h3>
        <div class="center content-inputs">
          <vs-input v-model="value1" class="input" placeholder="User name">
            <template #icon>
              <i class="far fa-user"></i>
            </template>
          </vs-input>

          <vs-input
            type="password"
            v-model="value2"
            class="input"
            placeholder="Password"
          >
            <template #icon>
              <i class="fas fa-lock"></i>
            </template>
          </vs-input>

          <v-btn rounded class="button">
            Login
          </v-btn>
        </div>
        <div class="links">
          <a href="#">Sign Up</a>
          <a href="#">Forgot Password</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    active: 0,
  }),
};
</script>

<style scoped>
.wrapper {
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding: 25px;
  height: 70vh;
  align-items: center;
}

.vs-card {
  padding: 20px 15px;
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

.input {
  margin-bottom: 8px;
  display: flex;
}

.button {
  background-color: #195bff !important;
  color: #fff;
  text-transform: none;
  display: block;
  width: 100%;
}

/* .content-inputs {
  width: 90%;
} */

h3 {
  margin-bottom: 10px;
}

.links {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 75%;
}

.links a {
  text-decoration: none;
}
</style>

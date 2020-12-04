<template>
  <div>
    <div class="wrapper">
      <div class="vs-card">
        <i class="fas fa-user-circle"></i>
        <h3>Sign Up</h3>
        <div class="center content-inputs">
          <input type="text" placeholder="Name" /><br />

          <input type="text" placeholder="Email" /><br />

          <div class="gender">
            <vs-select
              class="vs-select"
              label-placeholder="Gender"
              v-model="value2"
            >
              <vs-option label="Male" value="1">
                Male
              </vs-option>
              <vs-option label="Female" value="2">
                Female
              </vs-option>
            </vs-select>
          </div>

          <input type="password" placeholder="Password" />

          <input type="password" placeholder="Confirm Password" />

          <v-btn rounded class="button">
            Sign Up
          </v-btn>
        </div>
        <div class="links">
          <span>Already have an account?</span>
          <a href="#">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    active: 0,
    value1: '',
    value2: '',
    value3: '',
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
  margin-bottom: 18px;
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

.gender {
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

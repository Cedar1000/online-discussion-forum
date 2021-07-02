<template>
  <div class="wrapper">
    <div class="container">
      <h1>Welcome To Chat Forum</h1>
      <p>
        This is real-time chat application designed and developed for the
        purpose of connecting people
      </p>

      <router-link to="/login">Get Started</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style scoped>
.wrapper {
  font-family: 'Lato', sans-serrif;
  text-align: center;
  height: 60vh;
  display: flex;
  align-items: center;
}

.wrapper p {
  margin-top: 0.5rem;
}

.wrapper a {
  text-decoration: none;
  color: #fff;
  background: #195bff;
  padding: 10px 30px;
  display: inline-block;
  margin-top: 15px;
  border-radius: 50px;
}
</style>

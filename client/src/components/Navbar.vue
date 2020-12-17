<template>
  <div class="hidden">
    <vs-navbar shadow square center-collapsed v-model="active">
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <i class="fas fa-bars"></i>
        </vs-button>
      </template>

      <template #right>
        <vs-avatar
          v-show="isLoggedIn"
          badge
          circle
          badge-color="success"
          badge-position="bottom-right"
          size="35"
        >
          <img
            src="../assets/images/72571994_111521426928601_2576485395504037888_n.jpg"
          />
        </vs-avatar>

        <router-link v-show="!isLoggedIn" to="/login" class="login-btn"
          >Login</router-link
        >
      </template>
    </vs-navbar>
    <vs-sidebar
      class="sidebar-content"
      absolute
      v-model="active"
      :open.sync="activeSidebar"
      @click="closeNavbar"
    >
      <template #logo>
        <vs-avatar size="100" circle badge class="avatar">
          <img
            src="../assets/images/72571994_111521426928601_2576485395504037888_n.jpg"
            alt=""
          />
        </vs-avatar>
      </template>

      <h4 class="username">Cedar Daniel</h4>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="fas fa-home"></i>
        </template>
        <span @click="handleHome">Home</span>
      </vs-sidebar-item>

      <vs-sidebar-item id="Notifications">
        <template #icon>
          <div class="not-list">
            <i class="far fa-bell"></i>
            <span class="not-div">1</span>
          </div>
        </template>
        <span @click="handleNotification" to="/Notifications"
          >Notifications</span
        >
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="fas fa-list-ul"></i>
            </template>
            Categories
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="Instagram">
          <template #icon>
            <i class="bx bxl-instagram"></i>
          </template>
          Instagram
        </vs-sidebar-item>
        <vs-sidebar-item id="twitter">
          <template #icon>
            <i class="bx bxl-twitter"></i>
          </template>
          Twitter
        </vs-sidebar-item>
        <vs-sidebar-item id="Facebook">
          <template #icon>
            <i class="bx bxl-facebook"></i>
          </template>
          Facebook
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-sidebar-item id="profile">
        <template #icon>
          <i class="fas fa-user"></i>
        </template>
        <span @click="handleProfile">Profile</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-show="isLoggedIn" id="signout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        <span @click="signout">Sign Out</span>
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'navbar',
  data: () => ({
    active: 'home',
    activeSidebar: false,
  }),

  methods: {
    ...mapActions(['logout']),

    closeNavbar() {
      console.log('Navbar closed');
      this.activeSidebar = false;
    },

    handleNotification() {
      this.closeNavbar();
      this.$router.push('/Notifications');
    },

    handleProfile() {
      this.closeNavbar();
      this.$router.push('/Profile');
    },

    handleHome() {
      this.closeNavbar();
      this.$router.push('/Home');
    },

    signout() {
      this.logout();
      console.log('Signed Out');
    },
  },

  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>

<style scoped>
.sidebar-content {
  font-family: 'Lato', sans-serif;
  position: absolute;
  width: 100%;
  border-radius: 0;
  justify-content: start;
}

.user-image {
  height: 40px;
  width: 40px;
  width: 100%;
  height: 100%;
}

.not-div {
  height: 23px;
  width: 23px;
  background: #195bff;
  justify-content: center;
  text-align: center;
  align-items: center;
  display: flex;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  z-index: 2;
  position: relative;
  right: 4px;
  bottom: 8px;
  border: 2px solid #fff;
}

.login-btn {
  color: #fff;
  background: #195bff;
  border-radius: 12px;
  padding: 8px 15px;
  font-family: 'Lato', sans-serif;
  font-size: 12.8px;
  text-decoration: none;
  margin-left: 5px;
}

.login-btn:hover {
  cursor: pointer;
}

.not-list {
  display: flex;
}

.avatar {
  justify-content: start;
}

.avatar img {
  max-height: initial !important;
}

.username {
  margin: 0 auto;
}
</style>

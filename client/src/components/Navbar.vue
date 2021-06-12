<template>
  <div class="hidden">
    <vs-navbar shadow square center-collapsed v-model="active">
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <i class="fas fa-bars"></i>
        </vs-button>
      </template>

      <template>
        <p class="room">{{ $route.params.category }}</p>
      </template>

      <template #right>
        <vs-avatar
          v-if="isLoggedIn"
          badge
          circle
          badge-color="success"
          badge-position="bottom-right"
          size="35"
        >
          <img :src="currentUser.avatar" />
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
        <vs-avatar v-if="isLoggedIn" size="100" circle badge class="avatar">
          <img :src="currentUser.avatar" />
        </vs-avatar>
      </template>

      <h4 v-if="isLoggedIn" class="username">{{ currentUser.username }}</h4>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="fas fa-home"></i>
        </template>
        <span @click="redirectTo('/Home')">Home</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-if="isLoggedIn" id="Notifications">
        <template #icon>
          <div class="not-list">
            <i class="far fa-bell"></i>
            <span v-show="nNotifications > 0" class="not-div">{{
              nNotifications
            }}</span>
          </div>
        </template>
        <span @click="redirectTo('/Notifications')" to="/Notifications"
          >Notifications</span
        >
      </vs-sidebar-item>
      <vs-sidebar-group v-if="isLoggedIn">
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="fas fa-list-ul"></i>
            </template>
            Categories
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item
          v-for="category in allCategories"
          :key="category._id"
          :id="category.name"
          @click="logName(category.name)"
        >
          <template #icon>
            <i class="bx bxl-instagram"></i>
          </template>
          <span @click="redirect(category.name)">{{ category.name }}</span>
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-sidebar-item v-if="isLoggedIn" id="profile">
        <template #icon>
          <i class="fas fa-user"></i>
        </template>
        <span @click="redirectTo('/Profile')">Profile</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-if="isLoggedIn" id="manageCategory">
        <template #icon>
          <i class="fas fa-tasks"></i>
        </template>
        <span @click="redirectTo('/categories')">Manage Categories</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-show="isLoggedIn" id="signout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        <span @click="signout">Sign Out</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-show="!isLoggedIn" id="login">
        <template #icon>
          <i class="fas fa-sign-in-alt"></i>
        </template>
        <span @click="redirectTo('/Login')">Login</span>
      </vs-sidebar-item>

      <vs-sidebar-item v-show="!isLoggedIn" id="signup">
        <template #icon>
          <i class="fas fa-user-plus"></i>
        </template>
        <span @click="redirectTo('/Register')">Sign Up</span>
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { bus } from '../main';

export default {
  name: 'navbar',
  data: () => ({
    active: 'home',
    activeSidebar: false,
  }),

  methods: {
    ...mapActions(['logout']),

    closeNavbar() {
      this.activeSidebar = false;
    },

    redirectTo(url) {
      this.activeSidebar = false;
      this.$router.push(url);
    },

    signout() {
      this.logout();
    },

    redirect(category) {
      const roomLeaving = this.$route.params.category;
      this.closeNavbar();
      if (!this.$route.params.category);
      this.$router.push(`/posts/${category}`);
      bus.$emit('change-posts', { roomLeaving, category });
    },
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'nNotifications',
      'allCategories',
      'currentUser',
    ]),
  },

  mounted() {
    this.activeSidebar = false;
  },
};
</script>

<style scoped>
.room {
  font-family: 'Lato', sans-serif;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

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

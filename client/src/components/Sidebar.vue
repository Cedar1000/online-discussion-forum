<template>
  <div class="hidden">
    <vs-sidebar class="sidebar-content" v-model="active" open>
      <template #logo>
        <vs-avatar v-if="isLoggedIn" size="100" circle badge class="avatar">
          <img :src="currentUser.avatar" alt="" />
        </vs-avatar>
      </template>

      <h4 v-if="isLoggedIn" class="username">{{ currentUser.username }}</h4>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="fas fa-home"></i>
        </template>
        <router-link to="/">Home</router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="Notifications">
        <template #icon>
          <div class="not-list">
            <i class="far fa-bell"></i>
            <span v-show="nNotifications > 0" class="not-div">{{
              nNotifications
            }}</span>
          </div>
        </template>
        <router-link to="/Notifications">Notifications</router-link>
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

      <vs-sidebar-item v-show="isLoggedIn" id="profile">
        <template #icon>
          <i class="fas fa-user"></i>
        </template>
        <router-link to="/profile">Profile</router-link>
      </vs-sidebar-item>

      <vs-sidebar-item
        v-show="isLoggedIn && currentUser.role === 'admin'"
        id="manageCategories"
      >
        <template #icon>
          <i class="fas fa-tasks"></i>
        </template>
        <router-link to="/categories">Manage Categories</router-link>
      </vs-sidebar-item>

      <vs-sidebar-item
        v-show="isLoggedIn && currentUser.role === 'admin'"
        id="manageUsers"
      >
        <template #icon> <i class="fas fa-users"></i> </template>
        <router-link to="/users">Manage Users</router-link>
      </vs-sidebar-item>

      <vs-sidebar-item v-show="isLoggedIn" id="signout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        <span @click="signout">Sign Out</span>
      </vs-sidebar-item>

      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar>
            <img src="/avatars/avatar-5.png" alt="" />
          </vs-avatar>

          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="bx bx-bell"></i>

            <template #badge>
              28
            </template>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { bus } from '../main';

export default {
  name: 'sidebar',
  data: () => ({
    active: 'home',
  }),
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'allCategories',
      'currentUser',
      'nNotifications',
    ]),
  },

  methods: {
    ...mapActions([
      'logout',
      'fetchCategories',
      'getUserNotifications',
      'attempt',
      'fetchCategoryPosts',
    ]),

    signout() {
      this.logout();
    },

    redirect(category) {
      const roomLeaving = this.$route.params.category;

      if (!this.$route.params.category) console.log('No route');
      this.$router.push(`/posts/${category}`);
      bus.$emit('change-posts', { roomLeaving, category });
    },

    getCatPosts(name) {
      this.fetchCategoryPosts(name);
      this.$router.push('/posts');
    },
  },

  mounted() {
    this.fetchCategories();
    // this.attempt(localStorage.getItem('token'));
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}
.hidden {
  grid-column: 1/3;
  grid-row: 1/3;
  position: relative;
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

@media (max-width: 768px) {
  .sidebar-content {
    display: none;
  }

  .hidden {
    display: none;
  }
}
</style>

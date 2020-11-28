<template>
  <div class="hidden">
    <vs-sidebar class="sidebar-content" v-model="active" open>
      <template #logo>
        <vs-avatar size="100" circle badge class="avatar">
          <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
        </vs-avatar>
      </template>

      <h4 class="username">Cedar Daniel</h4>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="fas fa-home"></i>
        </template>
        Home
      </vs-sidebar-item>

      <vs-sidebar-item id="Notifications">
        <template #icon>
          <div class="not-list">
            <i class="far fa-bell"></i>
            <span class="not-div">1</span>
          </div>
        </template>
        Notifications
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
        Profile
      </vs-sidebar-item>

      <vs-sidebar-item id="signout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        Sign Out
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
export default {
  name: 'sidebar',
  data: () => ({
    active: 'home',
  }),
};
</script>

<style scoped>
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

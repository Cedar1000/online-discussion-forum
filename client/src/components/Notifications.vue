<template>
  <div>
    <div class="not-div">
      <v-list>
        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
          </vs-avatar>
          <div>
            <b>Cedar Daniel</b> liked your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-3.png" alt="" />
          </vs-avatar>
          <div>
            <b>Katy Perry</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-6.png" alt="" />
          </vs-avatar>
          <div>
            <b>Kendris Doe</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
          </vs-avatar>
          <div>
            <b>Cedar Daniel</b> liked your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-3.png" alt="" />
          </vs-avatar>
          <div>
            <b>Katy Perry</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-6.png" alt="" />
          </vs-avatar>
          <div>
            <b>Kendris Doe</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-3.png" alt="" />
          </vs-avatar>
          <div>
            <b>Katy Perry</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item class="list-item">
          <vs-avatar class="v-avatar" circle size="60">
            <img src="https://vuesax.com/avatars/avatar-6.png" alt="" />
          </vs-avatar>
          <div>
            <b>Kendris Doe</b> commented on your post
            <div class="timestamp">5 sec ago.</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
};
</script>

<style scoped>
.not-div {
  font-family: 'Lato', sans-serif;
  overflow: hidden;
  overflow-y: scroll;
  height: 90vh;
}

.list-item {
  display: flex;
  padding: 10px;
}

.v-avatar {
  margin-right: 5px;
}

.timestamp {
  margin-top: 5px;
  color: #616161;
  font-size: 14px;
}
</style>

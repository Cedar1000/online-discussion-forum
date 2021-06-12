<template>
  <div>
    <div class="not-div">
      <v-list v-show="Notifications && Notifications.length > 0">
        <v-list-item
          v-for="Not in Notifications"
          :key="Not.id"
          class="list-item"
          :class="{ unread: !Not.read }"
        >
          <vs-avatar class="v-avatar" circle size="60">
            <img :src="Not.actionUser.avatar" alt="" />
          </vs-avatar>

          <div @click="markRead(Not)">
            {{ Not.body }}
            <div class="timestamp">{{ simplifyDate(Not.createdAt) }}</div>
          </div>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <div
        class="no-nots"
        v-show="!Notifications || Notifications.length === 0"
      >
        <h2>No Notifications</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters(['Notifications']),
  },

  methods: {
    ...mapActions(['patchNotification']),

    markRead(not) {
      this.$router.push(`/post/${not.post}`);
      if (not.read === false) {
        this.patchNotification(not._id);
      }
    },

    simplifyDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}

.unread {
  background-color: #f8f8f8;
}

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

.no-nots {
  padding: 10px;
  text-align: center;
}
</style>

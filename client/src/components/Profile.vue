<template>
  <div>
    <div class="cover-image">
      <vs-avatar size="170" circle badge badge-color="success">
        <img :src="`http://localhost:3000/img/users/${currentUser.avatar}`" />
      </vs-avatar>
    </div>

    <div class="center examplex">
      <vs-table class="table" striped>
        <template #thead> </template>
        <template #tbody>
          <vs-tr>
            <vs-td class="td">
              <b>Name</b>
            </vs-td>
            <vs-td class="td2">
              {{ currentUser.name }}
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Email</b>
            </vs-td>
            <vs-td class="td2">
              {{ currentUser.email }}
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Gender</b>
            </vs-td>
            <vs-td class="td2">
              {{ currentUser.gender }}
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Joined</b>
            </vs-td>
            <vs-td class="td2">
              {{ currentUser.joined }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',

  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<style scoped>
.cover-image {
  display: flex;
  justify-content: center;
  margin-top: 35px;
}

.details {
  justify-content: center;
  display: flex;
}

.details b {
  margin-right: 15px;
}

.mx-auto {
  width: 50%;
  margin-top: 20px;
}

.center {
  width: 50%;
  margin: 20px auto;
  font-family: 'Lato', sans-serif;
}

.table {
  overflow: hidden;
}

.td,
.td2 {
  text-align: center;
  font-size: 16px;
}

@media (max-width: 600px) {
  .center {
    width: 100%;
  }
  .td2 {
    text-align: start;
  }
}
</style>

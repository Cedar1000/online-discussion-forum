<template>
  <div class="container">
    <h2>{{ nUsers }} user<span v-if="users.length > 1">s</span></h2>
    <vs-table striped class="vs-table">
      <template #thead>
        <vs-tr>
          <vs-th>
            Name
          </vs-th>
          <vs-th>
            Email
          </vs-th>

          <vs-th>
            Username
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          @click="setUser(user._id, user.name)"
          v-for="user in users"
          :key="user._id"
          :data="user"
        >
          <vs-td class="vs-td">
            <vs-avatar
              badge
              circle
              badge-color="success"
              badge-position="bottom-right"
              size="25"
            >
              <img :src="user.avatar" />
            </vs-avatar>
            <span class="vs-text">{{ user.name }}</span>
          </vs-td>

          <vs-td>
            {{ user.email }}
          </vs-td>

          <vs-td>
            {{ user.username }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <!-- MODAL -->
    <vs-dialog class="vs-dialogue" width="300px" not-center v-model="active">
      <template #header>
        <h4 class="not-margin">
          Make <b>{{ name }} admin?</b>
        </h4>
      </template>

      <template #footer>
        <div class="con-footer">
          <div class="btn-section">
            <vs-button @click="sendRole" transparent>
              Yes
            </vs-button>
            <vs-button @click="active = false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',

  data: () => ({
    active: false,
    id: '',
    name: '',
  }),

  methods: {
    ...mapActions(['getAllUsers', 'makeAdmin']),

    setUser(id, name) {
      this.id = id;
      this.name = name;
      this.active = true;
    },

    sendRole() {
      this.makeAdmin(this.id);
      this.active = false;
    },
  },

  computed: {
    ...mapGetters(['users', 'nUsers']),
  },

  created() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
.container,
.vs-dialogue {
  font-family: var(--brand-font);
}

.container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.vs-td {
  display: flex;
  justify-content: start;
  align-items: center;
}

.vs-text {
  margin-left: 5px;
}

.btn-section {
  display: flex;
}
</style>

<template>
  <div>
    <div v-if="loading" class="spinner">
      <half-circle-spinner
        :animation-duration="1000"
        :size="35"
        :color="'#195bff'"
      />
    </div>
    <div v-if="!loading" class="container">
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

      <!-- SUCCESSFUL ROLE CHANGE -->
      <vs-dialog class="vs-dialogue" width="300px" not-center v-model="success">
        <template #header>
          <h4 class="success-header">
            <b>{{ name }} is now admin?</b>
          </h4>
        </template>

        <div class="success-icon">
          <i class="far fa-check-circle success"></i>
        </div>

        <template #footer>
          <div class="con-footer">
            <div class="btn-section">
              <vs-button @click="success = false" transparent>
                Ok
              </vs-button>
            </div>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners';
import { bus } from '../main';

export default {
  name: 'Users',

  data: () => ({
    active: false,
    id: '',
    name: '',
    loading: true,
    success: false,
  }),

  components: {
    HalfCircleSpinner,
  },

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

  mounted() {
    bus.$on('set-users', () => (this.loading = false));
    bus.$on('set-role', () => (this.success = true));
  },

  created() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
.success-icon {
  text-align: center;
}

.success-header {
  text-align: center;
}

.success-icon .success {
  font-size: 100px;
  color: #195bff;
}

.spinner {
  display: flex;
  justify-content: center;
}

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
  justify-content: center;
}
</style>

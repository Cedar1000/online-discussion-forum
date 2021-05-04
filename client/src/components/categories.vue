<template>
  <div>
    <div class="table-div">
      <form @submit.prevent="setAdd">
        <div class="center content-inputs">
          <vs-input class="input" v-model="name" placeholder="Name" />
        </div>

        <vs-button class="vs-button">
          <i class="fas fa-plus"></i>
        </vs-button>
      </form>

      <vs-table striped class="vs-table">
        <template #thead>
          <vs-tr>
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Edit
            </vs-th>

            <vs-th>
              Delete
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="cat in allCategories" :key="cat._id" :data="cat">
            <vs-td class="vs-td">
              {{ cat.name }}
            </vs-td>

            <vs-td @click="handleEdit(cat.name, cat._id)">
              <i class="edit-icon fas fa-edit"></i>
            </vs-td>

            <vs-td class="delete" @click="handleDelete(cat.name, cat._id)">
              <i class="edit-icon fas fa-trash"></i>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <vs-dialog class="vs-dialogue" width="300px" not-center v-model="active">
        <template #header>
          <h4 class="not-margin">Edit Category <b>Name</b></h4>
        </template>

        <div class="con-content">
          <vs-input v-model="newName" placeholder="Name"></vs-input>
        </div>

        <template #footer>
          <div class="con-footer">
            <div class="btn-section">
              <vs-button @click="setUpdate" transparent>
                Ok
              </vs-button>
              <vs-button @click="active = false" dark transparent>
                Cancel
              </vs-button>
            </div>
          </div>
        </template>
      </vs-dialog>

      <vs-dialog class="vs-dialogue" width="300px" not-center v-model="active2">
        <template #header>
          <h4 class="not-margin">
            Are you sure you want delete <b>{{ newName }}?</b>
          </h4>
        </template>

        <template #footer>
          <div class="con-footer">
            <div class="btn-section">
              <vs-button @click="setDelete" transparent>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'categories',

  data: () => ({
    active: false,
    active2: false,
    name: '',
    newName: '',
    id: '',
  }),

  methods: {
    ...mapActions(['updateCategory', 'addCategory', 'deleteCategory']),

    handleEdit(name, id) {
      this.active = true;
      this.newName = name;
      this.id = id;
    },

    handleDelete(name, id) {
      this.active2 = true;
      this.newName = name;
      this.id = id;
    },

    setUpdate() {
      this.active = false;
      this.updateCategory({ id: this.id, name: this.newName });
    },

    setAdd() {
      this.name = '';
      this.addCategory({ name: this.name });
    },

    setDelete() {
      this.active2 = false;
      this.deleteCategory(this.id);
    },
  },

  computed: {
    ...mapGetters(['allCategories']),
  },
};
</script>

<style scoped>
.edit-icon {
  color: var(--brand-color);
}

.vs-table {
  font-family: var(--brand-font);
  padding: 10px;
}

form {
  display: flex;
  padding: 10px;
  font-family: var(--brand-font);
}

.vs-button {
  border-radius: 50%;
}

.center {
  width: 90%;
}

.vs-dialogue {
  font-family: var(--brand-font);
}

.btn-section {
  display: flex;
}

.delete {
  display: flex;
  justify-content: center;
}
</style>

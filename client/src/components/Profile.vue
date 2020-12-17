<template>
  <div>
    <div class="cover-image">
      <vs-avatar size="170" circle badge badge-color="success">
        <img
          src="../assets/images/72571994_111521426928601_2576485395504037888_n.jpg"
          alt=""
        />
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
              Cedar Daniel
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Email</b>
            </vs-td>
            <vs-td class="td2">
              Cedard686@gmail.com
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Gender</b>
            </vs-td>
            <vs-td class="td2">
              Male
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td class="td">
              <b>Joined</b>
            </vs-td>
            <vs-td class="td2">
              August 2020
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
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

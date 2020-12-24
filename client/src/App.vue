<template>
  <div>
    <Navbar />

    <div class=" content">
      <Sidebar />

      <div class="posts-div">
        <router-view></router-view>
      </div>

      <div class="add-post">
        <AddPost />
      </div>
    </div>
  </div>
</template>

<script>
// import Categories from './components/categories';
// import Posts from './components/Posts';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddPost from './components/AddPost';

export default {
  name: 'App',

  components: {
    // Categories,
    // Posts,
    Navbar,
    Sidebar,
    AddPost,
  },

  data: () => ({
    active: 'home',
  }),

  mounted() {
    console.log(this);
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: minmax(80px, auto);
  grid-gap: 10px;
  margin-top: 50px !important;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  height: 95vh;
}

.sidebar {
  grid-column: 1/3;
}

.posts-div {
  grid-column: 3/11;
  padding: 10px 15px;
}

.add-post {
  /* position: fixed; */
  bottom: 5px;
  grid-column: 3/11;
  display: flex;
}

@media (max-width: 768px) {
  .catdiv {
    display: none;
  }
  .wrapper {
    grid-template-columns: 1fr;
  }
  .content {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .sidebar {
    display: none;
  }
  .posts-div {
    margin-left: 0;
    grid-column: 1/11;
  }

  .add-post {
    position: fixed;
    bottom: 5px;
    grid-column: 1/11;
    width: 100%;
    padding: 0 6px;
  }
}

@media (max-width: 767px) {
  .posts-div {
    padding: 5px 0;
  }
}
</style>

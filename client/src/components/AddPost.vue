<template>
  <div class="input">
    <textarea-autosize
      placeholder="Type Post here..."
      ref="myTextarea"
      :min-height="20"
      :max-height="350"
      @blur.native="onBlurTextarea"
    />
    <v-btn class="mx-2" fab dark color="indigo">
      <i class="fas fa-paper-plane"></i>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'addpost',
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  width: 100%;
}

textarea {
  background: #e0e0e0;
  border-radius: 25px;
  width: 100%;
  padding: 10px;
  height: 40px !important;
  font-family: 'Lato', sans-serif;
  margin-right: 5px;
}

textarea:focus {
  outline: none;
}

button {
  height: 40px !important;
  width: 40px !important;
  background-color: #195bff !important;
}

.fas {
  font-size: 15px;
  margin-left: 5px;
}
</style>

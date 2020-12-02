<template>
  <div>
    <div class="wrapper">
      <i class="fas fa-arrow-left"></i>
      <div class="post">
        <!-- user div -->
        <div class="user">
          <vs-avatar size="55" circle class="avatar">
            <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
          </vs-avatar>

          <div class="post-details">
            <p><b>Cedar Daniel</b></p>
            <p class="timestamp">November 29 1:45 AM</p>
          </div>
        </div>

        <div class="post-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta natus
            suscipit fugit obcaecati. Pariatur veniam dolorum, facere libero
            maiores at! Enim ipsam repellat ab dolorum doloremque quaerat libero
            labore animi. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ullam dolorem enim fugiat, numquam perferendis veniam magni ab
            fuga recusandae a incidunt reprehenderit quod totam ea vero ut ipsa
            sit, autem, nemo consequuntur natus earum inventore beatae nam.
            Minima quia iure aperiam possimus accusantium labore in modi
            consectetur adipisci quisquam voluptatum obcaecati ratione illo,
            nesciunt cum magnam sapiente incidunt ut deserunt.
          </p>
        </div>
        <div class="actions">
          <span><i class="fas fa-heart"></i><b>12</b></span>
          <span><i class="far fa-comment"></i><b>5</b></span>
        </div>
      </div>

      <v-divider class="divider"></v-divider>
      <div class="comment-section">
        <div class="input">
          <textarea-autosize
            placeholder="Type Post here..."
            ref="myTextarea"
            v-model="value"
            :min-height="20"
            :max-height="350"
            @blur.native="onBlurTextarea"
          />
          <v-btn class="mx-2" fab dark color="indigo">
            <i class="fas fa-paper-plane"></i>
          </v-btn>
        </div>

        <div class="comments">
          <div class="comment">
            <div class="comment-inner">
              <vs-avatar size="35" circle class="avatar">
                <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
              </vs-avatar>
              <div class="comment-body">
                <h4>Cedar Daniel</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Blanditiis hic modi repudiandae sapiente facilis quam
                  voluptatum iusto numquam, nihil ut iure recusandae eum
                  accusantium possimus explicabo natus expedita temporibus
                  debitis!
                </p>
                <div class="actions">
                  <div class="wrapper-action">
                    <span><i class="fas fa-heart"></i><b>12</b></span>
                    <span><i class="fas fa-reply"></i><b>5</b></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment-replies">
              <div class="comment-inner">
                <vs-avatar size="35" circle class="avatar">
                  <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
                </vs-avatar>
                <div class="comment-body">
                  <h4>Cedar Daniel</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Blanditiis hic modi repudiandae sapiente facilis quam
                    voluptatum iusto numquam, nihil ut iure recusandae eum
                    accusantium possimus explicabo natus expedita temporibus
                    debitis!
                  </p>
                  <div class="actions">
                    <div class="wrapper-action">
                      <span><i class="fas fa-heart"></i><b>12</b></span>
                      <span><i class="fas fa-reply"></i><b>5</b></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="comment-inner">
                <vs-avatar size="35" circle class="avatar">
                  <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
                </vs-avatar>
                <div class="comment-body">
                  <h4>Cedar Daniel</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Blanditiis hic modi repudiandae sapiente facilis quam
                    voluptatum iusto numquam, nihil ut iure recusandae eum
                    accusantium possimus explicabo natus expedita temporibus
                    debitis!
                  </p>
                  <div class="actions">
                    <div class="wrapper-action">
                      <span><i class="fas fa-heart"></i><b>12</b></span>
                      <span><i class="fas fa-reply"></i><b>5</b></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>

          <div class="comment">
            <div class="comment-inner">
              <vs-avatar size="35" circle class="avatar">
                <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
              </vs-avatar>
              <div class="comment-body">
                <h4>Cedar Daniel</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Blanditiis hic modi repudiandae sapiente facilis quam
                  voluptatum iusto numquam, nihil ut iure recusandae eum
                  accusantium possimus explicabo natus expedita temporibus
                  debitis!
                </p>
                <div class="actions">
                  <div class="wrapper-action">
                    <span><i class="fas fa-heart"></i><b>12</b></span>
                    <span><i class="fas fa-reply"></i><b>5</b></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment-replies">
              <div class="comment-inner">
                <vs-avatar size="35" circle class="avatar">
                  <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
                </vs-avatar>
                <div class="comment-body">
                  <h4>Cedar Daniel</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Blanditiis hic modi repudiandae sapiente facilis quam
                    voluptatum iusto numquam, nihil ut iure recusandae eum
                    accusantium possimus explicabo natus expedita temporibus
                    debitis!
                  </p>
                  <div class="actions">
                    <div class="wrapper-action">
                      <span><i class="fas fa-heart"></i><b>12</b></span>
                      <span><i class="fas fa-reply"></i><b>5</b></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="comment-inner">
                <vs-avatar size="35" circle class="avatar">
                  <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
                </vs-avatar>
                <div class="comment-body">
                  <h4>Cedar Daniel</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Blanditiis hic modi repudiandae sapiente facilis quam
                    voluptatum iusto numquam, nihil ut iure recusandae eum
                    accusantium possimus explicabo natus expedita temporibus
                    debitis!
                  </p>
                  <div class="actions">
                    <div class="wrapper-action">
                      <span><i class="fas fa-heart"></i><b>12</b></span>
                      <span><i class="fas fa-reply"></i><b>5</b></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'singlePost',
};
</script>

<style scoped>
.wrapper {
  padding: 15px;
  font-family: 'Lato', sans-serif;
  overflow: hidden;
  overflow-y: scroll;
  height: 90vh;
}

.fa-arrow-left {
  margin: 15px 0;
  color: #195bff;
}
.user {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user .post-details {
  margin-left: 10px;
}

.timestamp {
  color: #616161;
}

.post-content p {
  color: #000000de;
}

.actions {
  display: flex;
  width: 10%;
  justify-content: space-between;
  margin: 10px 0;
  color: #195bff;
}
b {
  margin-left: 2px;
}

.fa-heart {
  color: #ef4545;
}

.input {
  display: flex;
  align-items: center;
  width: 50%;
  display: none;
}

textarea {
  background: #e0e0e0;
  border-radius: 25px;
  width: 100%;
  padding: 10px;
  height: 30px !important;
  font-family: 'Lato', sans-serif;
  margin-right: 5px;
  line-height: 30px;
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

.comment-section {
  margin-top: 15px;
}

.comments {
  padding: 15px;
}

.comment-inner {
  display: flex;
  margin-bottom: 15px;
}

.comments p {
  max-width: 450px;
  font-size: 15px;
}

.comment-body {
  background: #e4e6eb;
  padding: 10px 12px;
  border-bottom-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-left-radius: 18px;
  font-family: 'Roboto', sans-serif;
  margin-left: 5px;
}

.comments .actions {
  width: 100%;
  justify-content: flex-end;
  margin-top: 0;
  top: 0;
  position: relative;
}

.comments .actions span {
  margin-right: 10px;
}

.wrapper-action {
  background: #fff;
  border-bottom-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-left-radius: 18px;
  padding: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  font-size: 14px;
}

.comment-replies {
  margin-left: 50px;
}

.divider {
  margin-bottom: 15px;
}

.comment {
  padding-top: 15px;
}

@media (max-width: 768px) {
  .actions {
    width: 25%;
  }

  .comments {
    padding: 0;
  }

  .comment-inner {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    margin-bottom: 22px;
  }

  .comment-body {
    grid-column: 2/9;
    margin-left: 0;
  }
}
</style>

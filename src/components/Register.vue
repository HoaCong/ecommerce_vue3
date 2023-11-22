1<template>
  <section class="vh-100">
    <div class="container-fluid vh-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img class="img-fluid" :src="imageLogin" alt="Sample img" />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <h1 class="text-center mx-3 mb-0 font-bold">ĐĂNG KÝ</h1>
            </div>

            <div class="form-floating mb-3">
              <input
                v-model="data.username"
                type="text"
                class="form-control"
                :class="!data.username && submitted && 'is-invalid'"
              />
              <label>Username</label>
            </div>

            <small
              v-if="!data.username && submitted"
              class="d-block text-danger -mt-3"
            >
              Vui lòng nhập tài khoản
            </small>

            <div class="form-floating mb-3">
              <input
                v-model="data.email"
                type="text"
                class="form-control"
                :class="!validateEmail && submitted && 'is-invalid'"
              />
              <label>Email</label>
            </div>

            <small
              v-if="!validateEmail && submitted"
              class="d-block text-danger -mt-3"
            >
              {{
                !data.email
                  ? "Vui lòng nhập email"
                  : "Vui lòng nhập đúng định dạng email"
              }}
            </small>

            <div class="form-floating mb-3">
              <input
                v-model="data.password"
                type="password"
                class="form-control"
                :class="
                  ((!data.password && submitted) || status.isFailure) &&
                  'is-invalid'
                "
                name="password"
                @change="handleChange"
              />
              <label>Password</label>
            </div>

            <small
              v-if="!data.password && submitted"
              class="d-block text-danger -mt-3"
            >
              Vui lòng nhập mật khẩu
            </small>

            <small v-if="status.isFailure" class="d-block text-danger -mt-3">
              Tài khoản hoặc mật khẩu không đúng
            </small>

            <div class="text-center">
              <button
                type="button"
                class="btn btn-secondary btn-lg px-3 w-100 d-flex justify-content-center"
                style="width: 200"
                @click="handleSubmit"
              >
                <div
                  v-if="status.isLoading"
                  class="spinner-border text-white me-2 align-middle"
                  role="status"
                ></div>
                Đăng ký
              </button>
            </div>
            <div class="text-end mt-1">
              Đã có tài khoản.
              <router-link class="nav-link text-primary d-inline" to="/login"
                >Đăng nhập!</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import imageLogin from "../assets/image-login.webp";
import { mapActions, mapWritableState } from "pinia";
import { loginStore } from "../stores/login";
export default defineComponent({
  data() {
    return {
      data: {
        username: "",
        email: "",
        password: "",
      },
      submitted: false,
      imageLogin: imageLogin,
    };
  },
  computed: {
    ...mapWritableState(loginStore, ["one", "user", "status"]),
    validateEmail() {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(this.data.email);
    },
  },

  methods: {
    ...mapActions(loginStore, ["register"]),
    async handleSubmit() {
      this.submitted = true;
      if (!this.data.username || !this.validateEmail || !this.data.password)
        return;
      const res = await this.register(this.data);
      if (res) {
        this.data = {
          username: "",
          email: "",
          password: "",
        };
      }
      this.submitted = false;
    },
  },
});
</script>

<style>
.-mt-3 {
  margin-top: -18px;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg rounded navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"
        >Vuejs3 Shopping Cart</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart"
              ><i class="bi bi-cart-check"></i> ({{
                countCartItems
              }})</router-link
            >
          </li>
          <li class="nav-item">
            <span class="nav-link" @click="handleLogout"
              ><i class="bi bi-box-arrow-right"></i> Logout</span
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { mapWritableState } from "pinia";
import { loginStore } from "../stores/login";
import { productStore } from "../stores/product";

export default defineComponent({
  computed: {
    ...mapWritableState(loginStore, ["one", "user", "status"]),
    ...mapWritableState(productStore, ["countCartItems"]),
  },

  methods: {
    handleLogout() {
      this.user.username = "";
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
});
</script>

<style></style>

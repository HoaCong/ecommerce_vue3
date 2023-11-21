<template>
  <router-view v-if="checkPage"></router-view>
  <div v-else class="container">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapWritableState } from "pinia";
import { loginStore } from "./stores/login";
import Header from "./components/Header.vue";
export default defineComponent({
  components: { Header },
  computed: {
    ...mapWritableState(loginStore, ["one", "user", "status"]),
    checkPage() {
      const currentPath = this.$route.path;
      return currentPath === "/login" || currentPath === "/register";
    },
  },

  methods: {
    ...mapActions(loginStore, ["login"]),
  },
});
</script>

<style>
/* CSS styles */
</style>

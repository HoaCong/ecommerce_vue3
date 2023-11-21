import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
export const cartStore = defineStore("cart", {
  state: () => {
    return {
      one: {},
      carts: [],
    };
  },
  actions: {
    async getList() {
      try {
        const response = await axios.get("http://localhost:5000/carts");
        if (response.status === 200) {
          this.carts = response.data.cart;
        } else {
          this.carts = [];
        }
      } catch (error) {
        console.error("Login error:", error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Đăng nhập thất bại",
        //   text: "Xảy ra lỗi khi đăng nhập",
        // });
      }
    },

    async addToCart(params) {
      try {
        const response = await axios.post(
          "http://localhost:5000/carts",
          params
        );
        if (response.data.status === 200) {
          // this.carts = response.data.cart;
        } else {
          // this.carts = [];
        }
      } catch (error) {
        console.error("Login error:", error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Đăng nhập thất bại",
        //   text: "Xảy ra lỗi khi đăng nhập",
        // });
      }
    },
  },
});

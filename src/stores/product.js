import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
export const productStore = defineStore("product", {
  state: () => {
    return {
      one: {},
      products: [],
    };
  },
  actions: {
    async getList() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        if (response.status === 200) {
          this.products = response.data.product;
        } else {
          this.products = [];
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

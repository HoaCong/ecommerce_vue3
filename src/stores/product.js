import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
export const productStore = defineStore("product", {
  state: () => {
    return {
      one: {},
      products: [],
      cartItems: [],
    };
  },
  getters: {
    countCartItems() {
      return this.cartItems.length;
    },
    getCartItems() {
      return this.cartItems;
    },
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
      }
    },
    addToCart(item) {
      let index = this.cartItems.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        this.products[index].quantity += 1;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    incrementQ(item) {
      let index = this.cartItems.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    decrementQ(item) {
      let index = this.cartItems.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(
            (product) => product.id !== item.id
          );
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (product) => product.id !== item.id
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your item has been removed",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});

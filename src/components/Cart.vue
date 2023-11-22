<template>
  <div class="row my-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getCartItems" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                  <img
                    :src="item.image"
                    class="fluid rounded"
                    width="60"
                    height="60"
                    :alt="item.name"
                  />
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  <i @click="incrementQ(item)" class="bi bi-caret-up"></i>
                  <span class="mx-2">
                    {{ item.quantity }}
                  </span>
                  <i @click="decrementQ(item)" class="bi bi-caret-down"></i>
                </td>
                <td>
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)
                  }}
                </td>
                <td>
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price * item.quantity)
                  }}
                </td>
                <td>
                  <i
                    @click="removeFromCart(item)"
                    class="bi bi-cart-x text-danger"
                  ></i>
                </td>
              </tr>
              <tr>
                <th colSpan="3" class="text-center align-middle">Total</th>
                <td colSpan="3" class="text-center align-middle">
                  <span class="badge bg-danger rounded-pill">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        cartItems.reduce(
                          (acc, item) => (acc += item.price * item.quantity),
                          0
                        )
                      )
                    }}
                  </span>
                </td>
                <th
                  v-if="countCartItems > 0"
                  colSpan="3"
                  class="text-center align-middle"
                >
                  <button @click="handleSaveCart" class="btn btn-primary">
                    Lưu
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions, mapWritableState } from "pinia";
import { productStore } from "../stores/product";
import { cartStore } from "../stores/cart";
import { loginStore } from "../stores/login";

export default defineComponent({
  computed: {
    ...mapState(loginStore, ["user"]),
    ...mapState(productStore, [
      "countCartItems",
      "getCartItems",
      "incrementQ",
      "decrementQ",
      "removeFromCart",
    ]),
    ...mapWritableState(productStore, ["cartItems"]),
  },
  methods: {
    ...mapActions(cartStore, ["saveCart"]),
    async handleSaveCart() {
      const res = await this.saveCart({
        username: this.user.username,
        price: this.cartItems.reduce(
          (acc, item) => (acc += item.price * item.quantity),
          0
        ),
      });

      if (res) {
        this.cartItems = [];
      }
    },
  },
});
</script>

<style>
i {
  cursor: pointer;
}
</style>

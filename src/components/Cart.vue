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
                <td>${{ item.price }}</td>
                <td>${{ item.price * item.quantity }}</td>
                <td>
                  <i
                    @click="removeFromCart(item)"
                    class="bi bi-cart-x text-danger"
                  ></i>
                </td>
              </tr>
              <tr>
                <th colSpan="3" class="text-center">Total</th>
                <td colSpan="3" class="text-center">
                  <span class="badge bg-danger rounded-pill">
                    ${{
                      cartItems.reduce(
                        (acc, item) => (acc += item.price * item.quantity),
                        0
                      )
                    }}
                  </span>
                </td>
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
import { mapState } from "pinia";
import { productStore } from "../stores/product";
export default defineComponent({
  computed: {
    ...mapState(productStore, [
      "cartItems",
      "countCartItems",
      "getCartItems",
      "incrementQ",
      "decrementQ",
      "removeFromCart",
    ]),
  },
});
</script>

<style>
i {
  cursor: pointer;
}
</style>

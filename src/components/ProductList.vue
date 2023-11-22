<template>
  <div className="row my-4">
    <div v-for="product in products" class="col-md-4 mb-3" :key="product.id">
      <div class="card" style="width: '18rem'">
        <div class="image-container">
          <img :src="product.image" class="card-img-top" alt="..." />
        </div>
        <div class="card-body">
          <h6 class="card-text text-end">
            Giá:
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product?.price)
            }}
          </h6>
          <h5 class="card-title">{{ product.name }}</h5>

          <div class="text-center">
            <button @click="addToCart(product)" class="btn btn-primary">
              <i class="bi bi-cart-check"></i> add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { productStore } from "../stores/product";
export default defineComponent({
  computed: {
    ...mapState(productStore, ["products"]),
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions(productStore, ["getList", "addToCart"]),
  },
});
</script>

<style>
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card-title {
  min-height: 50px;
}
</style>

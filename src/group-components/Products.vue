<script>
import ProdApi from "@/api/ProdApi.js";

export default {
  name: 'Products',
  components: {
    NoteComponent,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      products: [],
      // curListId: -1,
    }
  },
  provide() {
    return {
      deleteProduct: this.deleteProduct,
      editProduct: this.editProduct,
    }
  },
  methods: {
    async getProducts(listId) {
      try {
        const response = await ProdApi.getAllProducts(listId);
        this.products = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createProduct() {
      try {
        const response = await ProdApi.createProduct(localStorage.getItem("curListId"), "New product");
        this.products.push(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async editProduct(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      try {
        await ProdApi.updateProduct(this.curListId, updatedProduct.id, updatedProduct);
      } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
      }
    },
    async deleteProduct(productId) {
      const index = this.products.findIndex(product => product.id === productId);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      try {
        await ProdApi.deleteProduct(this.curListId, productId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted(){
    const savedListId = localStorage.getItem('curListId');
    if (savedListId) {
      this.curListId = savedListId;
      await this.getProducts(savedListId);
    }
  }
}
import NoteComponent from "@/components/NoteComponent.vue";
</script>

<template>
  <v-list class="main-list" overflow-y-auto>
    <v-btn icon flat class="button-icon" @click="createProduct">
      <fa :icon="['fas', 'plus']"/>
    </v-btn>
    <div v-for="product in products" :key="product.id">
      <NoteComponent :data="product"/>
    </div>
  </v-list>
</template>

<style scoped>

p {
  margin: 0;
}
.v-btn {
  margin: 10px;
  padding: 10px;
  background: var(--color-accent);
}
</style>
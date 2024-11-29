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
      curListId: -1,
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
    async createNote() {
      try {
        const response = await ProdApi.createProduct(localStorage.getItem("curListId"), "New product");
        this.products.push(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(productId) {
      const index = this.products.findIndex(product => product.id === productId);
      if (index !== -1) {
        this.products.splice(index, 1);
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
    <div v-for="product in products" :key="product.id">
      <NoteComponent @note-deleted="deleteProduct" :data="product" :listId="this.curListId"/>
    </div>
  </v-list>
</template>

<style scoped>
p {
  margin: 0;
}
</style>
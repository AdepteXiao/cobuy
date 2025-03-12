<script>
export default {
  props: {
    prod: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedProduct: this.prod,
    };
  },
  methods: {
    async updateProduct() {
        this.$emit("edited", this.editedProduct);
        console.log(this.editedProduct);
    },
  },
};
</script>

<template>
  <v-dialog max-width="600px">
    <v-card>
      <v-card-title>Редактирование продукта</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateProduct">
          <v-text-field
              v-model="editedProduct.name"
              label="Название"
              required
          ></v-text-field>

          <v-textarea
              v-model="editedProduct.description"
              label="Описание"
              rows="3"
          ></v-textarea>

          <v-text-field
              v-model="editedProduct.price"
              label="Цена"
              type="number"
              min="0"
          ></v-text-field>

          <v-text-field
              v-model="editedProduct.count"
              label="Количество"
              type="number"
              min="0"
          ></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="this.$emit('close')">Отмена</v-btn>
        <v-btn color="blue darken-1" @click="updateProduct">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


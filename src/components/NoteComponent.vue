<script>
import ProdApi from "@/api/ProdApi.js";
import NoteEditComponent from "./NoteEditComponent.vue";

export default {
  name: 'NoteComponent',
  components: {
    NoteEditComponent,
  },
  props: {
    data: Object,
  },
  inject: ["deleteProduct", "editProduct"],
  data() {
    return {
      prod: this.data,
      curListId: this.data.shoppingListId,
      showEditDialog: false,
    };
  },
  mounted() {
    this.adjustButtonLayout();
    window.addEventListener('resize', this.adjustButtonLayout);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustButtonLayout);
  },
  methods: {
    adjustButtonLayout() {
      const noteCard = this.$refs.noteCard.$el;
      const noteButtons = this.$refs.noteButtons;

      if (noteCard && noteButtons) {
        this.noteCardWidth = noteCard.offsetWidth;

        if (this.noteCardWidth < 500 && this.prod.description.length > 54) {
          noteButtons.style.flexDirection = 'column';
        } else {
          noteButtons.style.flexDirection = 'row';
        }
      }
    },

    async updateProduct(updatedProduct) {
      console.log(updatedProduct)
      this.showEditDialog = false;
      await this.editProduct(updatedProduct);
    },

    async deleteNote(noteId) {
      this.showEditDialog = false;
      await this.deleteProduct(noteId)
    },
  }
};
</script>

<template>
  <v-card ref="noteCard" class="note-card col-7" @click="">
    <div class="left-rectangle"></div>
    <div class="content">
      <div class="note-hat">
        <div class="hat-info">
          <h4>{{ prod.name }}</h4>
          <v-divider></v-divider>
        </div>
        <div class="price">
          <p>{{ prod.price }}</p>
          <fa :icon="['fas', 'rub']" class="icon"/>
        </div>
      </div>
      <div class="bot-card">
        <p class="note-description">{{ prod.description }}</p>
        <div ref="noteButtons" class="note-buttons">
          <v-btn class="bottom-btn" density="compact" variant="outlined">Планирую</v-btn>
          <v-btn class="bottom-btn" density="compact" variant="outlined">Куплено</v-btn>
        </div>
      </div>
    </div>
    <v-menu class="menu-button-container" :location="'end top'">
      <template v-slot:activator="{ props }">
        <v-btn icon flat class="button-icon" v-bind="props">
          <fa :icon="['fas', 'ellipsis-h']"/>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="this.showEditDialog = true">
          <v-list-item-title>Редактировать</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteNote(prod.id)">
          <v-list-item-title>Удалить</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <NoteEditComponent :prod="prod" @edited="updateProduct" @close="this.showEditDialog = false" v-model="showEditDialog" max-width="500px" />
  </v-card>
</template>

<style scoped>
.v-list {
  padding: 0;
}

.v-list-item {
  color: var(--color-icon);
  margin: 0 !important;
}

.v-list-item--density-default.v-list-item--one-line {
  min-height: 35px;
  padding: 12px 5px 12px 5px;
}
  .button-icon {
    color: var(--color-icon);
    background-color: var(--color-accent);
  }

.note-card {
  min-width: 400px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  border-radius: 20px;
  background: var(--color-accent);
  position: relative;
  overflow: visible;
}


.bot-card {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.price {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  font-size: 14px;
  font-weight: normal;
  color: var(--color-text);
  padding: 0;
  margin-left: 5px;
}

.price p {
  font-size: 22px;
  font-weight: normal;
  color: var(--color-text);
  margin: 0;
  padding: 0;
}

.bottom-btn {
  background-color: var(--color-base);
  color: var(--color-text);
  border: 1px solid var(--color-stroke);
  border-radius: 10px;
  font-size: 10px;
  padding: 0 10px;

}

.note-buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
  align-self: flex-end;
}


.note-hat {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.left-rectangle {
  flex: 1 1 10vh;
  border-radius: 20px 0 0 20px;
  max-width: 30px;
  min-width: 10px;
  background-color: #70C9DC;
}

.hat-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

}

h4 {
  font-size: 14px;
  margin-bottom: 2px;
  margin-left: 4px;
}

.v-divider {
  width: 30%;
  margin: 0;
}

.note-description {
  font-size: 12px;
  margin-left: 4px;
  margin-bottom: 0;
  color: var(--color-subtext);
  align-self: flex-start;

}

.content {
  flex: 1;
  padding: 15px 15px 20px 10px;

}

</style>
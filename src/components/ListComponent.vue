<script>
  import GroupApi from "@/api/GroupApi.js";
  import ListApi from "@/api/ListApi.js";

  export default {
    name: 'ListComponent',
    props: {
      data: Object,
    },
    data() {
      return {
        isDialogOpen: false,
        editedListName: '',
        list: this.data,
      }
    },
    computed: {
      listProgress() {
        if (this.list.productsCount === 0) {
          return 0;
        }
        return (this.list.checkedProductsCount / this.list.productsCount) * 100;
      }
    },
    methods: {
      async deleteList() {
        try {
          this.$emit('list-deleted', this.list.id);
          await ListApi.deleteList(this.list.id);
        } catch (error) {
          console.log(error);
        }
      },
      openEditDialog() {
        this.editedListName = this.list.name;
        this.isDialogOpen = true;
      },
      async updateList() {
        if (!this.editedListName.trim()) return;
        try {
          this.$emit('list-updated', this.list.id);
          await ListApi.updateList(this.list.id, this.editedListName);
          this.list.name = this.editedListName;
          this.isDialogOpen = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
    }
  }

</script>

<template>
  <v-card variant="flat" @click="" class="list-component" rounded="0">
    <div class="column-list">
      <div class="list-info">
        <h4>{{ list.name }}</h4>
      </div>
      <div class="progress-info">
        <v-progress-linear rounded :model-value="listProgress"></v-progress-linear>
        <p>{{ listProgress.toFixed(0) }}%</p>
      </div>
    </div>
    <v-menu :location="'end top'">
      <template v-slot:activator="{ props }">
        <v-btn icon flat class="button-icon" v-bind="props">
          <fa :icon="['fas', 'ellipsis-h']"/>
        </v-btn>
      </template>

      <v-list >
        <v-list-item @click="openEditDialog">
          <v-list-item-title>Редактировать</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteList">
          <v-list-item-title>Удалить</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="isDialogOpen" max-width="500px">
      <v-card>
        <v-card-title>Редактировать список</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="editedListName"
              label="Название списка"
              outlined
              dense
              required>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="red" @click="isDialogOpen = false">Отмена</v-btn>
          <v-btn  color="green" @click="updateList">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

.list-component {
  display: flex;
  align-items: center;
  padding: 10px;
  min-width: 300px;
  background-color: var(--color-accent);
}

.column-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.button-icon {
  color: var(--color-icon);
  background-color: var(--color-accent);
}

.v-progress-linear {
  color: var(--color-icon);
}

.list-info {
  display: flex;
  flex-direction: column;
}

.group-info h2 {
  margin: 0;
  font-size: 1.5em;
}

.progress-info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.progress-info p {
  color: var(--color-subtext);
  margin: 0;
  font-size: 11px;
}

p {
  margin: 0;
  font-size: 15px;
}

h4 {
  font-size: 14px;
  margin-bottom: 2px;
  margin-left: 4px;
}

.progress-info p {
  gap: 7px;
  color: var(--color-icon);
}

</style>
<script setup>
  import {ref} from "vue";

  const listName = ref('List Name');
  const listProgress = ref(20);

</script>

<template>
  <v-card variant="flat" @click="" class="list-component" rounded="0">
    <div class="column-list">
      <div class="list-info">
        <h4>{{ listName }}</h4>
      </div>
      <div class="progress-info">
        <v-progress-linear rounded :model-value="listProgress"></v-progress-linear>
        <p>{{ listProgress }}%</p>
      </div>
    </div>
    <v-btn icon flat class="button-icon">
      <fa :icon="['fas', 'ellipsis-h']" />
    </v-btn>
  </v-card>
</template>

<style scoped>
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
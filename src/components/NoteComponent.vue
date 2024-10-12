<script setup>

</script>

<template>
  <v-card class="note-card col-7">
    <div class="left-rectangle"></div>
    <div class="content">
      <v-card-title>
        <h3>Заголовок заметки</h3>
      </v-card-title>
      <v-card-text>
        <p>Текст заметки</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<style scoped>
.note-card {
  min-width: 400px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  border-radius: 20px;
  border: 1px solid #C0CFD3;
  background: #F7FBFC;
  position: relative;
}

.left-rectangle {
  flex: 1 1 10vh;
  max-width: 35px;
  min-width: 10px;
  background-color: var(--color-accent);
}

h3 {
  font-size: 20px;
}
.content {
  flex: 1;
  padding-left: 10px;
}
</style>
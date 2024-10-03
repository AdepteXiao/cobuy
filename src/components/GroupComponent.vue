<script setup>
import { ref } from 'vue';

const groupName = ref('Group Name');
const participantsCount = ref(10);
const postsCount = ref(5);
const groupImage = ref('src/assets/test-photo.png');

</script>

<template>
  <div class="group-component">
    <div class="icon">
<!--      <img :src="groupImage" alt="Group Image" />-->
    </div>
    <div class="group-info">
      <h2>{{ groupName }}</h2>
      <p><fa :icon="['fas', 'users']" /> Participants: {{ participantsCount }}</p>
      <p><fa :icon="['fas', 'file-alt']" /> Posts: {{ postsCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.group-component {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
}

.group-info {
  display: flex;
  flex-direction: column;
}

.group-info h2 {
  margin: 0;
  font-size: 1.5em;
}

.group-info p {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.group-info p fa {
  margin-right: 5px;
}
</style>
<script setup xmlns="http://www.w3.org/1999/html">
  import GroupComponent from "@/components/GroupComponent.vue";
  import { ref } from 'vue';
  import AuthApi from './api/AuthApi.js';
  import {useDark, useToggle} from "@vueuse/core";
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  // export default {
  //   name: 'App',
    // components: {
    // },
  // }
  const email = ref('');
  const password = ref('');
  let success = ref(false);
  const isLeftPartVisible = ref(true);


  const handleLogin = async () => {
    try {
      const response = await AuthApi.login(email.value, password.value);
      console.log(response);
      success.value = true;
    } catch (error) {
      console.error(error);
    }
  };
  const toggleLeftPart = () => {
    isLeftPartVisible.value = !isLeftPartVisible.value;
  };
</script>

<template>
  <div id="app">
    <main class="main-container">
      <div class="left-part" v-if="isLeftPartVisible">
        <button class="toggle-button" @click="toggleLeftPart">
          <fa :icon="['fas', 'bars']" />
        </button>
        <GroupComponent />
        <GroupComponent />
        <GroupComponent />
        <GroupComponent />
        <GroupComponent />
      </div>
      <div class="right-part">
        <div class="app-bar">
          <button  v-if="!isLeftPartVisible" class="open-bar-button" @click="toggleLeftPart">
            <fa :icon="['fas', 'bars']" />
          </button>
          <p>Группа №1 | Список группы №1</p>
        </div>
<!--        <form @submit.prevent="handleLogin">-->
<!--          <input type="email" v-model="email" placeholder="Email" required />-->
<!--          <input type="password" v-model="password" placeholder="Password" required />-->
<!--          <button type="submit">Войти</button>-->
<!--        </form>-->
<!--        <fa icon="plus"/>-->
<!--        <p v-if="success">Успех!</p>-->
      </div>
    </main>
  </div>
</template>

<style scoped>
#app {
  background-color: var(--color-background);
}

.toggle-button {
  margin: 10px;
}

.app-bar {
  background-color: var(--color-accent);
  color: var(--color-text);
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.open-bar-button {
  position: absolute;
  left: 10px;
}

.main-container {
  height: 100vh;
  display: flex;
}

.left-part {
  background-color: var(--color-base);
  flex: 0 0 25%;
  height: 100vh;
  border-right: 1px solid #ccc;
  min-width: 300px;
}

.right-part {
  flex: 1;
  height: 100vh;
  min-width: 400px;
}
</style>
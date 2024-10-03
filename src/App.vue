<script setup xmlns="http://www.w3.org/1999/html">
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

  const handleLogin = async () => {
    try {
      const response = await AuthApi.login(email.value, password.value);
      console.log(response);
      success.value = true;
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <div id="app">
    <div class="app-bar">
      <h1>Группа №1 | Список группы №1</h1>
    </div>

    <main>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Войти</button>
      </form>
      <p v-if="success">Успех!</p>
    </main>
  </div>
</template>

<style scoped>
#app {
  background-color: var(--color-background)
}

.app-bar {
  background-color: var(--color-accent);
  color: var(--color-text);
  padding: 20px;
  text-align: center;
}

</style>

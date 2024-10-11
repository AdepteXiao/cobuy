<script>
import GroupComponent from "@/components/GroupComponent.vue";
import NoteComponent from "@/components/NoteComponent.vue";
import {ref} from 'vue';
import AuthApi from './api/AuthApi.js';
import {useDark, useToggle} from "@vueuse/core";
import {useDisplay} from "vuetify";

export default {
  name: 'App',
  components: {
    GroupComponent,
    NoteComponent
  },
  data() {
    return {
      drawer: true,
      email: '',
      password: '',
      success: false,
      isLeftPartVisible: true,
      isDark: useDark(),
      toggleDark: useToggle(useDark()),
      display: useDisplay(),
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await AuthApi.login(this.email, this.password);
        console.log(response);
        this.success = true;
      } catch (error) {
        console.error(error);
      }
    },
    toggleLeftPart() {
      this.isLeftPartVisible = !this.isLeftPartVisible;
    }

  },
  mounted() {
    console.log(display.width.value);
  }
}
</script>

<template>
  <v-app id="app">

    <v-main>
        <v-row>
          <v-navigation-drawer class="left-drawer" permanent>
            <v-list-item title="My Application"></v-list-item>
            <v-divider></v-divider>
            <GroupComponent />
            <GroupComponent />
            <GroupComponent />
            <GroupComponent />
          </v-navigation-drawer>
          <v-container>
            <v-app-bar >
            </v-app-bar>
            <NoteComponent />
            <NoteComponent />
            <NoteComponent />
          </v-container>
        </v-row>
    </v-main>
    <!--  <div id="app">-->
    <!--    <main class="main-container">-->
    <!--      <v-navigation-drawer v-if="isLeftPartVisible">-->
    <!--        <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>-->
    <!--        <v-divider></v-divider>-->
    <!--        <v-list-item link title="List Item 1"></v-list-item>-->
    <!--        <v-list-item link title="List Item 2"></v-list-item>-->
    <!--        <v-list-item link title="List Item 3"></v-list-item>-->
    <!--      </v-navigation-drawer>-->
    <!--&lt;!&ndash;      <div class="left-part col-md-3 col-lg-3" v-if="isLeftPartVisible">&ndash;&gt;-->
    <!--&lt;!&ndash;        <button class="toggle-button" @click="toggleLeftPart">&ndash;&gt;-->
    <!--&lt;!&ndash;          <fa :icon="['fas', 'bars']" />&ndash;&gt;-->
    <!--&lt;!&ndash;        </button>&ndash;&gt;-->
    <!--&lt;!&ndash;        <GroupComponent />&ndash;&gt;-->
    <!--&lt;!&ndash;        <GroupComponent />&ndash;&gt;-->
    <!--&lt;!&ndash;        <GroupComponent />&ndash;&gt;-->
    <!--&lt;!&ndash;        <GroupComponent />&ndash;&gt;-->
    <!--&lt;!&ndash;        <GroupComponent />&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--      <div class="right-part ">-->
    <!--        <div class="app-bar">-->
    <!--          <button  v-if="!isLeftPartVisible" class="open-bar-button" @click="toggleLeftPart">-->
    <!--            <fa :icon="['fas', 'bars']" />-->
    <!--          </button>-->
    <!--          <p>Группа №1 | Список группы №1</p>-->
    <!--        </div>-->
    <!--        <NoteComponent />-->
    <!--        <NoteComponent />-->
    <!--        <NoteComponent />-->
    <!--&lt;!&ndash;        <form @submit.prevent="handleLogin">&ndash;&gt;-->
    <!--&lt;!&ndash;          <input type="email" v-model="email" placeholder="Email" required />&ndash;&gt;-->
    <!--&lt;!&ndash;          <input type="password" v-model="password" placeholder="Password" required />&ndash;&gt;-->
    <!--&lt;!&ndash;          <button type="submit">Войти</button>&ndash;&gt;-->
    <!--&lt;!&ndash;        </form>&ndash;&gt;-->
    <!--&lt;!&ndash;        <fa icon="plus"/>&ndash;&gt;-->
    <!--&lt;!&ndash;        <p v-if="success">Успех!</p>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </main>-->
    <!--  </div>-->
  </v-app>
</template>

<style scoped>
#app {
  background-color: var(--color-background);
}

.toggle-button {
  margin: 10px;
}

.app-bar {
  background-color: var(--color-accent) !important;
  color: var(--color-text);
  padding: 10px;
  height: 30px;
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

.left-drawer {
  background-color: var(--color-base);
  border-right: 1px solid #ccc;
  min-width: 300px;
}

.right-part {
  height: 100vh;
  min-width: 400px;
}
</style>
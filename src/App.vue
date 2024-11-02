<script>
import GroupComponent from "@/components/GroupComponent.vue";
import NoteComponent from "@/components/NoteComponent.vue";
import {ref} from 'vue';
import AuthApi from './api/AuthApi.js';
import {useDark, useToggle} from "@vueuse/core";
import {useDisplay} from "vuetify";
import ListComponent from "@/components/ListComponent.vue";
import GroupApi from "@/api/GroupApi.js";
import BaseApi from "@/api/BaseApi.js";

export default {
  name: 'App',
  components: {
    ListComponent,
    GroupComponent,
    NoteComponent
  },
  data() {
    return {
      drawer: true,
      email: "qwe@qwe.qwe",
      password: "qweqweqwe",
      success: false,
      isLeftPartVisible: true,
      isDark: useDark(),
      toggleDark: useToggle(useDark()),
      display: useDisplay(),
      closableDrawer: true,
      groups: Object,
    };
  },
  methods: {
    async getGroups() {
      try {
        const response = await GroupApi.getAllGroups();
        this.groups = response.data;
        this.groups = this.groups.data;
        console.log(this.groups.data)
      } catch (error) {
        console.log(error);
      }
    },
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
      if (this.closableDrawer) {
        this.drawer = !this.drawer;
      }
    },
    handleResize(entries) {
      for (let entry of entries) {
        // this.drawer = !(entry.contentRect.width <= 1280);
        if (entry.contentRect.width <= 800) {
          console.log('<= 800px');
          this.closableDrawer = true;
          this.drawer = false;
        } else {
          console.log('>= 800px');
          this.closableDrawer = false;
          this.drawer = true
        }
      }
    }

  },
  async mounted() {
    const resizeObserver = new ResizeObserver(this.handleResize);
    const element = this.$el;
    resizeObserver.observe(element);

    this.resizeObserver = resizeObserver;

    localStorage.setItem('auth_token', '139|7s42Ign6FfPGWLKid19zhOPrx7vP4GPOG4hY7gjec976ae6f');

    // await this.handleLogin();
    await this.getGroups();
  },
  beforeUnmount() {
    this.resizeObserver.disconnect();
  }
}
</script>

<template>
  <v-app id="app">

    <v-main>
      <v-row no-gutters>
        <v-col cols="auto" v-if="drawer" v-model="drawer" class="left-drawer">
          <!--          <v-navigation-drawer cols="3" v-if="drawer" v-model="drawer" class="left-drawer">-->
          <div class="scroll-list-annotation">
            <p class="annotation-text">Группы</p>
            <v-spacer></v-spacer>
            <v-btn icon flat size="x-small" class="sidebar-button">
              <fa :icon="['fas', 'plus']"/>
            </v-btn>
          </div>
          <v-divider></v-divider>
          <v-list class="sidebar-list" overflow-y-auto>
            <div v-for="group in groups" :key="group.id">
              <GroupComponent :data="group"/>
              <v-divider></v-divider>
            </div>
          </v-list>
          <v-divider></v-divider>
          <div class="scroll-list-annotation">
            <p class="annotation-text">Списки</p>
            <v-spacer></v-spacer>
            <v-btn icon flat size="x-small" class="sidebar-button">
              <fa :icon="['fas', 'plus']"/>
            </v-btn>
          </div>
          <v-divider></v-divider>
          <v-list class="sidebar-list" overflow-y-auto>
            <div v-for="index in 10" :key="index">
              <ListComponent/>
              <v-divider></v-divider>
            </div>
          </v-list>
          <v-divider></v-divider>
          <!--          </v-navigation-drawer>-->
        </v-col>
        <v-col class="right-part">
          <v-toolbar class="app-bar">
            <v-btn v-if="closableDrawer" icon @click="toggleLeftPart">
              <fa :icon="['fas', 'angle-left']" class="app-bar-icon"/>
            </v-btn>
            <p class="app-bar-text">Группа №1 | Список группы №1</p>
            <v-spacer></v-spacer>
            <v-btn icon @click="">
              <fa :icon="['fas', 'gear']" class="app-bar-icon"/>
            </v-btn>
          </v-toolbar>
          <v-list class="main-list" overflow-y-auto>
            <div v-for="index in 10" :key="index">
              <NoteComponent/>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-main>

    <!--    <v-main>-->
    <!--      <v-row no-gutters>-->
    <!--        <v-col cols="3">-->
    <!--          <v-navigation-drawer class="left-drawer" v-model="drawer">-->
    <!--            <GroupComponent/>-->
    <!--            <GroupComponent/>-->
    <!--            <GroupComponent/>-->
    <!--            <GroupComponent/>-->
    <!--          </v-navigation-drawer>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" class="right-part">-->
    <!--            <v-toolbar title="Группа 1"></v-toolbar>-->
    <!--            <NoteComponent/>-->
    <!--            <NoteComponent/>-->
    <!--            <NoteComponent/>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--    </v-main>-->


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

.v-divider {
  margin: 0;
  padding: 0;
  color: var(--color-subtext);
}

.v-list {
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  max-height: calc(100vh - 50px);
}

.scroll-list-annotation {
  padding: 13px 5px 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.annotation-text {
  font-size: 15px;
  font-weight: 400;
  color: var(--color-subtext);
}

.sidebar-button {
  color: var(--color-subtext);
  font-size: 15px;
  background-color: var(--color-base);
}

.sidebar-list {
  active-color: var(--color-background);
  max-height: calc(50vh - 52px);
}

::-webkit-scrollbar {
  width: 0;
}

.app-bar-icon {
  font-size: 20px;
  font-weight: lighter;
  color: var(--color-text);
}

.toggle-button {
  margin: 10px;
}

.app-bar {
  background-color: var(--color-accent) !important;
  color: var(--color-text);
  height: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.app-bar-text {
  padding-left: 20px;
  font-size: 17px;
}

.open-bar-button {
  position: absolute;
  left: 10px;
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
  min-width: 200px !important;
}

.right-part {

  height: 100vh;
}

p {
  margin: 0;
}
</style>
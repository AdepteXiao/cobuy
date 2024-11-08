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
import groupUtils from "@/utils/groupUtils.js";
import ListApi from "@/api/ListApi.js";
import ProdApi from "@/api/ProdApi.js";

export default {
  name: 'App',
  components: {
    ListComponent,
    GroupComponent,
    NoteComponent
  },
  data() {
    return {
      curGroupId: -1,
      curListId: -1,
      drawer: true,
      email: "qwe@qwe.qwe",
      password: "qweqweqwe",
      success: false,
      isLeftPartVisible: true,
      isDark: useDark(),
      toggleDark: useToggle(useDark()),
      display: useDisplay(),
      closableDrawer: true,
      lists: [],
      groups: [],
      products: [],
    };
  },
  methods: {
    async getGroups() {
      try {
        const response = await GroupApi.getAllGroups();
        console.log(response)
        this.groups = response.data.data;
        console.log(this.groups)
      } catch (error) {
        console.log(error);
      }
    },
    async getLists(groupId) {
      this.curGroupId = groupId;
      try {
        const response = await ListApi.getAllLists(this.curGroupId);
        this.lists = response.data.data;
        console.log(this.lists);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllProds(listId) {
      this.curListId = listId;
      try {
        const response = await ProdApi.getAllProducts(this.curListId);
        this.products = response.data.data;
        console.log(this.products);
      } catch (error) {
        console.error(error);
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
    // this.groups = await groupUtils.getGroups();
    // console.log(this.groups);
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
              <GroupComponent :data="group" @click="this.getLists(group.id)"/>
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
            <div v-for="list in lists" :key="list.id">
              <ListComponent :data="list" @click="getAllProds(list.id)"/>
              <v-divider></v-divider>
            </div>
          </v-list>
          <v-divider></v-divider>
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
            <div v-for="product in products" :key="product.id">
              <NoteComponent :data="product"/>
            </div>
          </v-list>
          <!--          <v-list class="main-list" overflow-y-auto>-->
          <!--            <div v-for="index in 10" :key="index">-->
          <!--              <NoteComponent/>-->
          <!--            </div>-->
          <!--          </v-list>-->
        </v-col>
      </v-row>
    </v-main>
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
  height: calc(50vh - 52px);
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
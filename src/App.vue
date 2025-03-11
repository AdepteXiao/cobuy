<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
};
</script>

<!--<script>-->
<!--import GroupComponent from "@/components/GroupComponent.vue";-->
<!--import NoteComponent from "@/components/NoteComponent.vue";-->
<!--import {ref, watchEffect} from 'vue';-->
<!--import AuthApi from './api/AuthApi.js';-->
<!--import {useDark, useToggle} from "@vueuse/core";-->
<!--import {useDisplay} from "vuetify";-->
<!--import ListComponent from "@/components/ListComponent.vue";-->
<!--import GroupApi from "@/api/GroupApi.js";-->
<!--import BaseApi from "@/api/BaseApi.js";-->
<!--import groupUtils from "@/utils/groupUtils.js";-->
<!--import ListApi from "@/api/ListApi.js";-->
<!--import ProdApi from "@/api/ProdApi.js";-->
<!--import Groups from "@/group-components/Groups.vue";-->
<!--import Lists from "@/group-components/Lists.vue";-->
<!--import Products from "@/group-components/Products.vue";-->

<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    Products,-->
<!--    Lists,-->
<!--    ListComponent,-->
<!--    GroupComponent,-->
<!--    NoteComponent,-->
<!--    Groups-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      curGroupId: -1,-->
<!--      curListId: -1,-->
<!--      drawer: true,-->
<!--      email: "qwe@qwe.qwe",-->
<!--      password: "qweqweqwe",-->
<!--      success: false,-->
<!--      isLeftPartVisible: true,-->
<!--      isDark: useDark(),-->
<!--      toggleDark: useToggle(useDark()),-->
<!--      display: useDisplay(),-->
<!--      closableDrawer: true,-->
<!--      lists: [],-->
<!--      groups: [],-->
<!--      products: [],-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    currentGroupAndList() {-->
<!--      // const groupId = localStorage.getItem('curGroupId');-->
<!--      // const listId = localStorage.getItem('curListId');-->
<!--      if (this.curGroupId > 0 && this.curListId > 0) {-->
<!--        return `Группа №${this.curGroupId} | Список группы №${this.curListId}`;-->
<!--      } else if (this.curGroupId) {-->
<!--        return `Группа №${this.curGroupId}`;-->
<!--      } else {-->
<!--        return '';-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleGroupSelected(groupId) {-->
<!--      this.curGroupId = groupId;-->
<!--      this.$refs.lists.getLists(groupId);-->
<!--    },-->
<!--    handleListSelected(listId) {-->
<!--      this.curListId = listId;-->
<!--      this.$refs.products.getProducts(listId);-->
<!--    },-->
<!--    async handleLogin() {-->
<!--      try {-->
<!--        const response = await AuthApi.login(this.email, this.password);-->
<!--        console.log(response);-->
<!--        this.success = true;-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--      }-->
<!--    },-->
<!--    toggleLeftPart() {-->
<!--      if (this.closableDrawer) {-->
<!--        this.drawer = !this.drawer;-->
<!--      }-->
<!--    },-->
<!--    handleResize(entries) {-->
<!--      for (let entry of entries) {-->
<!--        // this.drawer = !(entry.contentRect.width <= 1280);-->
<!--        if (entry.contentRect.width <= 800) {-->
<!--          console.log('<= 800px');-->
<!--          this.closableDrawer = true;-->
<!--          this.drawer = false;-->
<!--        } else {-->
<!--          console.log('>= 800px');-->
<!--          this.closableDrawer = false;-->
<!--          this.drawer = true-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--  },-->
<!--  async mounted() {-->
<!--    const resizeObserver = new ResizeObserver(this.handleResize);-->
<!--    const element = this.$el;-->
<!--    resizeObserver.observe(element);-->
<!--    this.resizeObserver = resizeObserver;-->
<!--    localStorage.setItem('auth_token', '139|7s42Ign6FfPGWLKid19zhOPrx7vP4GPOG4hY7gjec976ae6f');-->
<!--    // await this.handleLogin();-->
<!--    // await this.getGroups();-->
<!--    // this.groups = await groupUtils.getGroups();-->
<!--    // console.log(this.groups);-->
<!--  },-->
<!--  beforeUnmount() {-->
<!--    this.resizeObserver.disconnect();-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <v-app id="app">-->
<!--    <v-main>-->
<!--      <v-row no-gutters>-->
<!--        <v-col cols="auto" v-if="drawer" v-model="drawer" class="left-drawer">-->
<!--          &lt;!&ndash;          <v-navigation-drawer cols="3" v-if="drawer" v-model="drawer" class="left-drawer">&ndash;&gt;-->
<!--          <Groups @group-selected="handleGroupSelected"></Groups>-->
<!--          <v-divider></v-divider>-->
<!--          <Lists @list-selected="handleListSelected" ref="lists"></Lists>-->
<!--          <v-divider></v-divider>-->
<!--        </v-col>-->
<!--        <v-col class="right-part">-->
<!--          <v-toolbar class="app-bar">-->
<!--            <v-btn v-if="closableDrawer" icon @click="toggleLeftPart">-->
<!--              <fa :icon="['fas', 'angle-left']" class="app-bar-icon"/>-->
<!--            </v-btn>-->
<!--            <p class="app-bar-text">{{ currentGroupAndList }}</p>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-btn icon @click="">-->
<!--              <fa :icon="['fas', 'gear']" class="app-bar-icon"/>-->
<!--            </v-btn>-->
<!--          </v-toolbar>-->
<!--          <Products ref="products"></Products>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-main>-->
<!--  </v-app>-->
<!--</template>-->

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

::-webkit-scrollbar {
  width: 0;
}

.app-bar-icon {
  font-size: 20px;
  font-weight: lighter;
  color: var(--color-text);
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
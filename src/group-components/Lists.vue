<script>
  import ListComponent from "@/components/ListComponent.vue";
  import ListApi from "@/api/ListApi.js";
  import GroupApi from "@/api/GroupApi.js";

  export default {
    name: 'Lists',
    components: {
      ListComponent,
    },
    props: {
      data: Object,
    },
    data() {
      return {
        lists: [],
        curListId: -1,
        curGroupId: -1,
      }
    },
    methods: {
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
      async createList() {
        this.curGroupId = localStorage.getItem('curGroupId');
        try {
          const response = await ListApi.createList(this.curGroupId, "New List");
          console.log("added list")
          this.lists.push(response.data.data);
        } catch (error) {
          console.log(error);
        }
      },
      async deleteList(listId) {
        const index = this.lists.findIndex(list => list.id === listId);
        if (index !== -1) {
          this.lists.splice(index, 1);
        }
      },
      async getAllProds(listId) {
        this.curListId = listId;
        localStorage.setItem('curListId', listId);
        this.$emit('list-selected', listId);
      },
    },
    mounted() {
    }
  }
</script>

<template>
  <div class="scroll-list-annotation">
    <p class="annotation-text">Списки</p>
    <v-spacer></v-spacer>
    <v-btn icon flat size="x-small" class="sidebar-button" @click="createList()">
      <fa :icon="['fas', 'plus']"/>
    </v-btn>
  </div>
  <v-divider></v-divider>
  <v-list class="sidebar-list" overflow-y-auto>
    <div v-for="list in lists" :key="list.id">
      <ListComponent :data="list" @list-deleted="deleteList" @click="getAllProds(list.id)"/>
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<style scoped>
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
p {
  margin: 0;
}
</style>
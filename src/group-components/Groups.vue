<script>
import GroupComponent from "@/components/GroupComponent.vue";
import GroupApi from "@/api/GroupApi.js";

export default {
  name: 'Groups',
  components: {
    GroupComponent,
  },
  data() {
    return {
      groups: [],
      curGroupId: -1,
    }
  },
  methods: {
    async getGroups() {
      try {
        const response = await GroupApi.getAllGroups();
        this.groups = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createGroup() {
      try {
        const response = await GroupApi.createGroup("New Group", "");
        this.groups.push(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGroup(groupId) {
      const index = this.groups.findIndex(group => group.id === groupId);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
    },
    async getLists(groupId) {
      this.curGroupId = groupId;
      localStorage.setItem('curGroupId', groupId);
      this.$emit('group-selected', groupId);
    },
  },
  async mounted() {
    await this.getGroups();
    const savedGroupId = localStorage.getItem('curGroupId');
    if (savedGroupId) {
      this.curGroupId = savedGroupId;
      await this.getLists(savedGroupId);
    }
  },
}
</script>

<template>
  <div class="scroll-list-annotation">
    <p class="annotation-text">Группы</p>
    <v-spacer></v-spacer>
    <v-btn icon flat size="x-small" class="sidebar-button" @click="createGroup()">
      <fa :icon="['fas', 'plus']"/>
    </v-btn>
  </div>
  <v-divider></v-divider>
  <v-list class="sidebar-list" overflow-y-auto>
    <div v-for="group in groups" :key="group.id">
      <GroupComponent :data="group" @group-deleted="deleteGroup" @click="getLists(group.id)"/>
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
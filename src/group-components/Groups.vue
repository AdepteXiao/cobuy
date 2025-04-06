<script>
import GroupComponent from "@/components/GroupComponent.vue";
import GroupApi from "@/api/GroupApi.js";
import GroupImagesApi from "@/api/GroupImagesApi.js";
import JoinGroupDialog from "@/components/JoinGroupDialog.vue";
import InviteApi from "@/api/InviteApi.js";

export default {
  name: 'Groups',
  components: {
    GroupComponent,
    JoinGroupDialog
  },
  data() {
    return {
      groups: [],
      text: '',
      showJoinDialog: false
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
        this.groups.unshift(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGroup(groupId) {
      const index = this.groups.findIndex(group => group.id === groupId);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
      try {
        await GroupApi.deleteGroup(groupId);
      } catch (error) {
        console.log(error);
      }
    },
    async editGroup(groupId, name) {
      const index = this.groups.findIndex(group => group.id === groupId);
      this.groups[index].name = name;
      try {
        await GroupApi.updateGroup(groupId, name);
      } catch (error) {
        console.log(error);
      }
    },
    async editGroupAvatar(groupId, formData) {
      const index = this.groups.findIndex(group => group.id === groupId);
      this.groups[index].avaUrl = URL.createObjectURL(formData.get('image'));
      try {
        await GroupImagesApi.updateAva(groupId, formData);
      } catch (error) {
        console.log(error);
      }
    },
    async inviteToGroup(token){
      try {
        await InviteApi.invite(token);
        await this.getGroups();
      } catch (error) {
        console.log(error);
      }
    },
    async getLists(groupId) {
      this.curGroupId = groupId;
      localStorage.setItem('curGroupId', groupId);
      this.$emit('group-selected', groupId);
    },
    openJoinDialog() {
      this.$refs.joinDialog.open();
    }
  },
  provide() {
    return {
      inviteToGroup: this.inviteToGroup,
      deleteGroup: this.deleteGroup,
      editGroup: this.editGroup,
      editGroupAvatar: this.editGroupAvatar,
    }
  },
  async mounted() {
    await this.getGroups();
    const savedGroupId = localStorage.getItem('curGroupId');
    if (savedGroupId) {
      this.curGroupId = savedGroupId;
      await this.getLists(savedGroupId);
    }
  }
}
</script>

<template>
  <div class="scroll-list-annotation">
    <p class="annotation-text">Группы</p>
    <v-spacer></v-spacer>
    <v-btn icon flat size="x-small" class="sidebar-button" @click="openJoinDialog">
      <fa :icon="['fas', 'sign-in']"/>
    </v-btn>
    <v-btn icon flat size="x-small" class="sidebar-button" @click="createGroup()">
      <fa :icon="['fas', 'plus']"/>
    </v-btn>
  </div>
  <v-divider></v-divider>
  <v-list class="sidebar-list" overflow-y-auto>
    <div v-for="group in groups" :key="group.id">
      <GroupComponent :data="group" @click="getLists(group.id)"/>
      <v-divider></v-divider>
    </div>
  </v-list>
  <JoinGroupDialog ref="joinDialog"/>
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
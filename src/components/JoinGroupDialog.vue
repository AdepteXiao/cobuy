<script>
import InviteApi from "@/api/InviteApi.js";
import GroupApi from "@/api/GroupApi.js";
export default {
  name: 'JoinGroupDialog',
  data() {
    return {
      dialog: false,
      token: ''
    };
  },
  inject: ["inviteToGroup"],
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async joinGroup() {
      console.log(`Введенный токен: ${this.token}`);
      await this.inviteToGroup(this.token);
      this.close();
    }
  }
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Вступить в группу</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="token"
            label="Введите токен"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="close">Отмена</v-btn>
        <v-btn color="blue darken-1" @click="joinGroup">Вступить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


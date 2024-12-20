<script>
import QRCode from "qrcode";
import Compressor from 'compressorjs';
import GroupApi from "@/api/GroupApi.js";
import ListApi from "@/api/ListApi.js";
import imageCompression from 'browser-image-compression';


export default {
  name: "GroupEditComponent",
  props: {
    group: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      isGroupAvaChanged: false,
      isGroupNameChanged: false,
      selectedFile: null,
      editingGroupName: this.group.name,
      groupAvaUrl: this.group.avaUrl,
      inviteLink: ``,
      qrCodeUrl: "",
      members: this.group.members,
    };
  },
  methods: {
    async updateGroup() {
      if (this.isGroupAvaChanged) {
        const formData = new FormData();
        formData.append("image", this.selectedFile);
        this.$emit("group-ava-edited", this.group.id, formData);
      }
      if (this.isGroupNameChanged) {
        this.$emit("group-name-edited", this.group.id, this.editingGroupName);
      }
    },
    async removeMember(memberId) {
      try {
        await GroupApi.kick(this.group.id, memberId);
        this.members = this.members.filter((m) => m.id !== memberId);
      } catch (error) {
        console.error("Error removing member:", error);
      }
    },
    async generateQRCode() {
      this.qrCodeUrl = await QRCode.toDataURL(this.inviteLink);
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        imageCompression(file, options).then((compressedFile) => {
          this.selectedFile = compressedFile;
          this.groupAvaUrl = URL.createObjectURL(compressedFile);
          this.isGroupAvaChanged = true;
          if (compressedFile.size > 5 * 1024 * 1024) {
            console.error('Файл слишком большой!');
          }
        }).catch((error) => {
          console.error('Ошибка при сжатии:', error);
        });

      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
  mounted() {
    // this.generateQRCode();
  },
};
</script>
<template>
  <v-dialog max-width="600px">
    <v-card class="main-dialog-card">
      <p class="card_name">Редактирование группы</p>
      <div class="row_in_edit">
        <div class="icon_photo" @click="triggerFileInput">
          <img v-if="groupAvaUrl" :src="groupAvaUrl" alt="Group Avatar"/>
        </div>
        <div class="group-info">
          <v-text-field
              v-model="editingGroupName"
              label="Название группы"
              variant="outlined"
              color="primary"
              @change="this.isGroupNameChanged = true"
              required>
          </v-text-field>
        </div>
      </div>
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none;"
          @change="handleFileChange"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="this.$emit('close')">Отмена</v-btn>
        <v-btn color="primary" @click="updateGroup">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-text-field {
  margin-top: 20px;
  color: var(--color-icon);
}

.row_in_edit {
  width:100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
}

.main-dialog-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-width: 300px;
  background-color: var(--color-accent);
}

.group-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.group-info h2 {
  margin: 0;
  font-size: 1.5em;
}

.info-with-icons {
  display: flex;
  flex-direction: row;
  gap: 17px;
}

p {
  margin: 0;
  font-size: 15px;
}
h4 {
  font-size: 21px;
  margin-bottom: 2px;
}

.icon_photo {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  margin: 0;

}

.card_name {
  font-size: 21px;
  margin-bottom: 10px;
}

.icon_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>

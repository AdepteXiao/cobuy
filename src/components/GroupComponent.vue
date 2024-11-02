<script>
export default {
  name: 'GroupComponent',
  props: {
    data: Object,
  },
  data() {
    return {
      group: this.data
      // group: {
      //   name: 'Group Name',
      //   membersCount: 0,
      //   listsCount: 0,
      // }
    }
  },
  mounted() {
    // console.log(this.group)
  }
}

</script>

<template>
  <v-card variant="flat" @click="" class="group-component" rounded="0">
      <div class="icon">
        <img :src="group.avaUrl" alt="Group Image" />
      </div>
      <div class="group-info">
        <h4>{{ group.name }}</h4>
        <div class="info-with-icons">
          <p><fa :icon="['fas', 'users']" class="icon-info"/> {{ group.membersCount }}</p>
          <p><fa :icon="['fas', 'file-alt']" class="icon-info"/> {{ group.listsCount }}</p>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon flat class="button-icon">
        <fa :icon="['fas', 'ellipsis-h']" />
      </v-btn>
  </v-card>

</template>

<style scoped>
.group-component {
  display: flex;
  align-items: center;
  padding: 10px;
  min-width: 300px;
  background-color: var(--color-accent);
}

.button-icon {
  color: var(--color-icon);
  background-color: var(--color-accent);
}


.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
}

.group-info {
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
  font-size: 14px;
  margin-bottom: 2px;
}

.info-with-icons p {
  gap: 7px;
  font-size: 14px;
  color: var(--color-icon);
}

.icon-info {
  font-size: 12px;
  color: var(--color-icon);

}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

</style>
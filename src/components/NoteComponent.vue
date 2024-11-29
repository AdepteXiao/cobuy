<script>
import ProdApi from "@/api/ProdApi.js";
import GroupApi from "@/api/GroupApi.js";

export default {
  name: 'NoteComponent',
  props: {
    data: Object,
    listId: Number,
  },
  data() {
    return {
      prod: this.data
    };
  },
  mounted() {
    this.adjustButtonLayout();
    window.addEventListener('resize', this.adjustButtonLayout);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustButtonLayout);
  },
  methods: {
    adjustButtonLayout() {
      const noteCard = this.$refs.noteCard.$el;
      const noteButtons = this.$refs.noteButtons;

      if (noteCard && noteButtons) {
        this.noteCardWidth = noteCard.offsetWidth;

        if (this.noteCardWidth < 500 && this.prod.description.length > 54) {
          noteButtons.style.flexDirection = 'column';
        } else {
          noteButtons.style.flexDirection = 'row';
        }
      }
    },

    async deleteNote(noteId) {
      try {
        await ProdApi.deleteProduct(this.listId, noteId);
        this.$emit('note-deleted', noteId);
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<template>
  <div>
  <v-card ref="noteCard" class="note-card col-7" @click="">
    <div class="left-rectangle"></div>
    <div class="content">
      <div class="note-hat">
        <div class="hat-info">
          <h4>{{ prod.name }}</h4>
          <v-divider></v-divider>
        </div>
        <div class="price">
          <p>{{ prod.price }}</p>
          <fa :icon="['fas', 'rub']" class="icon"/>
        </div>
      </div>
      <div class="bot-card">
        <p class="note-description">{{ prod.description }}</p>
        <div ref="noteButtons" class="note-buttons">
          <v-btn density="compact" variant="outlined">Планирую</v-btn>
          <v-btn density="compact" variant="outlined">Куплено</v-btn>
        </div>
      </div>
    </div>
    <v-btn
        class="delete-button"
        color="red"
        @click="deleteNote(prod.id)"
        icon
        elevation="1"
    >
      <fa :icon="['fas', 'times']" />
    </v-btn>
  </v-card>
  </div>
</template>

<style scoped>
  .note-card {
    min-width: 400px;
    display: flex;
    flex-direction: row;
    margin: 10px;
    border-radius: 20px;
    background: var(--color-accent);
    position: relative;
    overflow: visible; /* Важно для отображения кнопки за пределами карточки */
  }

  .note-card::after {
    content: "";
    position: absolute;
    top: -20px; /* Расширяем зону сверху */
    bottom: -20px; /* Расширяем зону снизу */
    left: -20px; /* Расширяем зону слева */
    right: 60px; /* Делаем пространство справа для кнопки */
    z-index: 5;
  }

  .delete-button {
    position: absolute;
    top: 50%; /* Центрируем вертикально */
    right: -40px; /* Сдвигаем кнопку правее */
    transform: translateY(-50%); /* Корректируем выравнивание */
    background-color: red;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 20% !important;
    display: none; /* Скрываем по умолчанию */
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

.note-card:hover .delete-button {
  display: flex; /* Показываем при наведении на карточку */
}


.bot-card {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.price{
  display: flex;
  flex-direction: row;
  align-items: center;}

.icon {
  font-size: 14px;
  font-weight: normal;
  color: var(--color-text);
  padding: 0;
  margin-left: 5px;
}

.price p{
  font-size: 22px;
  font-weight: normal;
  color: var(--color-text);
  margin: 0;
  padding: 0;
}

.v-btn {
  background-color: var(--color-base);
  color: var(--color-text);
  border: 1px solid var(--color-stroke);
  border-radius: 10px;
  font-size: 10px;
  padding: 0 10px;

}

.note-buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
  align-self: flex-end;
}



.note-hat {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.left-rectangle {
  flex: 1 1 10vh;
  max-width: 30px;
  min-width: 10px;
  background-color: #70C9DC;
}

.hat-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

}

h4 {
  font-size: 14px;
  margin-bottom: 2px;
  margin-left: 4px;
}

.v-divider {
  width: 30%;
  margin: 0;
}

.note-description {
  font-size: 12px;
  margin-left: 4px;
  margin-bottom: 0;
  color: var(--color-subtext);
  align-self: flex-start;

}

.content {
  flex: 1;
  padding: 15px 15px 20px 10px;

}
</style>
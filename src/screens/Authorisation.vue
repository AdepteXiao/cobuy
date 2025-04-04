<script>
import AuthApi from "@/api/AuthApi.js";

export default {
  data() {

    return {
      emailRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      passwordRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
      email: '',
      password: ''
    };
  },
  methods: {
    async goToRegister() {
      this.$router.push('/registration');
    },
    async handleLogin() {
      try {
        const response = await AuthApi.login(this.email, this.password);
        console.log(response);
        localStorage.setItem('auth_token', response.data.accessToken);
        localStorage.setItem('user_login', this.email);
        this.$router.push('/main');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <div class="main">
    <v-card class="log-in-card">
      <h2 class="name">Вход</h2>
      <v-card-text>
        <form id="form" novalidate @submit.prevent="handleLogin">
          <v-text-field class="margin-20px" v-model="email" label="Email" variant="outlined" required
                        :rules="emailRules"></v-text-field>
          <v-text-field class="margin-20px" v-model="password" label="Password" variant="outlined" type="password"
                        required></v-text-field>
          <v-btn class="full-width" color="grey-lighten-3" density="default" variant="flat" size="x-large" type="submit"
                 :rules="passwordRules">Войти
          </v-btn>
        </form>
        <v-btn class="full-width text-none" @click="goToRegister" variant="text">Нет аккаунта? Создать</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>


<style scoped>
p {
  margin: 0;
}

.name {
  margin: 20px;
  text-align: center;
}

.main {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
}

.full-width {
  width: 100vw;
}

.log-in-card {
  //display: flex;

  margin: 0 auto;
  max-width: 300px;
  min-width: 200px;
  //width: 100%;
}

#form {
  gap: 40px;
}

.margin-20px {
  margin: 16px 0;
}

</style>
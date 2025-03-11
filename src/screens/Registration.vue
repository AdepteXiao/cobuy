<script>
import AuthApi from "@/api/AuthApi.js";

export default {
  data() {

    return {
      login: '',
      email: '',
      password: '',
      repeatPassword: '',
      loginRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
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
      repeatPasswordRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => value === this.password || 'Passwords do not match'
      ]
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    async handleRegistration() {
      try {
        const response = await AuthApi.register(this.name, this.email, this.password);
        console.log(response);
        this.$router.push('/login');
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
      <h2 class="name">Регистрация</h2>
      <v-card-text>
        <form id="form" novalidate
              @submit.prevent="handleRegistration">
          <v-text-field class="margin-20px" v-model="login" label="Login" variant="outlined" required :rules="loginRules">
          </v-text-field>
          <v-text-field class="margin-20px" v-model="email" label="Email" variant="outlined" required :rules="emailRules">
          </v-text-field>
          <v-text-field class="margin-20px" v-model="password" label="Password" variant="outlined" type="password"
                        required :rules="passwordRules"></v-text-field>
          <v-text-field class="margin-20px" v-model="repeatPassword" label="Repeat password" variant="outlined" type="password"
                        required :rules="repeatPasswordRules"></v-text-field>
          <v-btn class="full-width" color="grey-lighten-3" density="default" variant="flat" size="x-large"
                 type="submit">Войти
          </v-btn>
        </form>
        <v-btn class="full-width text-none" @click="goToLogin" variant="text">Уже есть аккаунт? Войти</v-btn>
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
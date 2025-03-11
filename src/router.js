import { createRouter, createWebHistory } from 'vue-router';
import Authorisation from './screens/Authorisation.vue';
import MainPage from './screens/MainPage.vue';
import Registration from "./screens/Registration.vue";

const routes = [
    {
        path: '/',
        redirect: '/login' // Перенаправление на страницу авторизации по умолчанию
    },
    {
        path: '/login',
        component: Authorisation
    },
    {
        path: '/main',
        component: MainPage
    },
    {
        path: '/registration',
        component: Registration
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
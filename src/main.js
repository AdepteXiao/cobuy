import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import BaseApi from "@/api/BaseApi.js";


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

BaseApi.addToken();

library.add(fas);
createApp(App)
    .component("fa", FontAwesomeIcon)
    .use(vuetify)
    .use(router)
    .mount('#app')

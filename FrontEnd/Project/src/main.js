// main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router';

const app = createApp(App);

// Configuração do Axios
app.config.globalProperties.$axios = axios;

// Use o roteador
app.use(router);

// Monte o aplicativo
app.mount('#app');


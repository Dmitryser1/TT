import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // если используете vue-router

const app = createApp(App);

app.use(router);

app.mount('#app');
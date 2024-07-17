import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuestic } from 'vuestic-ui';
import { createPinia } from 'pinia';
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// import './assets/tailwind.css'

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(createVuestic());

app.mount('#app');

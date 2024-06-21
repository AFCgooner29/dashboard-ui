import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuestic } from 'vuestic-ui';
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.use(createVuestic());
app.mount('#app');

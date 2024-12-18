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
app.use(createVuestic({
    config: {
      colors: {
        variables: {
          // Default colors
          primary: "#000e35",
          secondary: "#b3ccff",
          success: "#068700",
          info: "#003f87",
          danger: "#cf0000",
          warning: "#fce62c",
          gray: "#6c6c6b",
          dark: "#3d3d3d",

          // Custom colors
          yourCustomColor: "#d0f55d",
        },
      },
    },
  }));

app.mount('#app');

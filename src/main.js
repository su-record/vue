import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiPlugin from './plugins/api';
import mixins from './mixins';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ApiPlugin);
app.mixin(mixins);
app.mount('#app');

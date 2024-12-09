import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import clickOutside from './directives/click-outside';
import checkPerm from './directives/perm';

import './index.css';

createApp(App)
  .use(store)
  .use(router)
  .use(clickOutside)
  .use(checkPerm)
  .mount('#app');

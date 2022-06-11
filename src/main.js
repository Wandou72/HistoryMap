import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import App3 from './App3.vue'
import App4 from './App4.vue'
import App5 from './App5.vue'
import App6 from './App6.vue'
import store from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(store,axios,VueAxios).mount('#app');
createApp(App2).use(store,axios,VueAxios).mount('#app2');
createApp(App3).use(store,axios,VueAxios).mount('#app3');
createApp(App4).use(store,axios,VueAxios).mount('#app4');
createApp(App5).use(store,axios,VueAxios).mount('#app5');
createApp(App6).use(store,axios,VueAxios).mount('#app6')
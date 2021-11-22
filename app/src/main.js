import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import { rtdbPlugin } from 'vuefire';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
Vue.use(rtdbPlugin);

Vue.use(Quasar, quasarUserOptions);

new Vue({
  render: h => h(App),
}).$mount('#app');

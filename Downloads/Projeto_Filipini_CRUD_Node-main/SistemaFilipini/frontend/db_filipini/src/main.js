import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { VueMaskDirective } from "v-mask";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.directive("mask", VueMaskDirective);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var islogged = false;

new Vue({
  router,
  vuetify,
  BootstrapVue,
  IconsPlugin,
  islogged,
  render: h => h(App)
}).$mount('#app')
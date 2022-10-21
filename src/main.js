import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import 'ag-grid-enterprise'
import axios from "axios";
import VueApexCharts from 'vue-apexcharts'
let token = localStorage.getItem("auth-token");

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueApexCharts,
  render: h => h(App),
}).$mount('#app')

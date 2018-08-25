// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
import 'es6-promise/auto'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueResource);
import ElementUI from 'element-ui'
import './assets/theme/element-#1C6132/index.css'
Vue.use(ElementUI)

// Vue.prototype.$utils = Utils;
// Vue.prototype.$api = Api;
// Vue.use(ElementUI);

Vue.config.productionTip = false

//开发模式开启mock.js
if (process.env.NODE_ENV === 'development') {
  //require('./mock')
}

import axios from 'axios'
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

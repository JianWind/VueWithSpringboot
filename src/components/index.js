export default {
  install (Vue, options) {
    Vue.component('left-menu', () => import(/* webpackChunkName: "leftMenu" */ './leftMenu'))
    // Vue.component('sendSms', () => import(/* webpackChunkName: "sendSms" */ './sendSms'))
    // Vue.component('chart', () => import(/* webpackChunkName: "chart" */ 'vue-echarts/components/ECharts.vue'))
    // Vue.component('searchDateForm', () => import(/* webpackChunkName: "searchDateForm" */ './searchDateForm.vue'))
  }
}

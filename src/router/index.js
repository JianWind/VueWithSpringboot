import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/Main'
import Dashboard from '@/page/Dashboard'
import Member from '@/page/Member'
Vue.use(Router)

let routes = [{
  path: '/',
  component: Main,
  hidden: true,
  children: [{
    path: '/',
    component: Dashboard,
    name: '首页'
  }]
}]

routes.push({
  path: '/member',
  name: '会员管理',
  component: Main,
  iconCls: 'fa fa-user-circle-o',
  children: [{
    path: '/member/data',
    component: Member,
    name: '会员信息管理'
  }]
})

const router = new Router({
  routes: routes
})

export default router

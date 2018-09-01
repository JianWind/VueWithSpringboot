import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/admin/Main'
import Dashboard from '@/page/admin/Dashboard'
import JSysUser from '@/page/JSysUser/JSysUser'
import user from './user'
Vue.use(Router)

let routes = [
  ...user,
  {
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
  path: '/admin',
  name: '系统管理',
  component: Main,
  iconCls: 'fa fa-user-circle-o',
  children: [{
    path: '/admin/jSysUser',
    component: JSysUser,
    name: '用户信息管理'
  }, {
    path: '/admin/SysDict',
    component: JSysUser,
    name: '数据字典管理'
  }]
})

const router = new Router({
  routes: routes
})

export default router

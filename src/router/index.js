import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/admin/Main'
import Dashboard from '@/page/admin/Dashboard'
import JSysUser from '@/page/JSysUser/JSysUser'
import user from './user'
import cacheData from '@/assets/plugin/cacheData'
Vue.use(Router)
const isBuild = process.env.NODE_ENV === 'production'

let userInfo = sessionStorage.getItem('user')
let resourceData = sessionStorage.getItem('resourceData')
let routes = [
  { path: '/', redirect: '/login' },
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
if (userInfo && resourceData) {
  routes = cacheData({
    user: JSON.parse(userInfo),
    menuTree: JSON.parse(resourceData)
  })
  // router.addRoutes(routes)
}

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
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
    next(false)
  } else {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path !== '/login') {
      sessionStorage.removeItem('user')
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

// 全局后置钩子
router.afterEach((to, from, next) => {
  let routerTitle = ''
  if (to.meta.title) {
    routerTitle = to.meta.title
  } else {
    routerTitle = 'Jane管理后台'
  }
  document.title = routerTitle
})

// 注册一个回调，该回调会在路由导航过程中出错时被调用。
router.onError(err => {
  console.log(err)
  Vue.prototype.$message({
    dangerouslyUseHTMLString: true,
    message: `${err}<br>${!isBuild && '请检查代码，是否更新、合并冲突、模块未开发...'}`,
    type: 'warning'
  })
})
export default router

// import resourceList from '@/router/admin'
import home from '@/page/admin/Main'
import main from '@/router/error/main'
// import testVue from './testRoutes' // 测试模块
// const isBuild = process.env.NODE_ENV === 'production'
export default (params) => {
  // 测试模块
  // let testRoutes = Array.isArray(testVue) && testVue.length ? testVue.map(item => ({
  //   path: item.murl,
  //   name: item.murl,
  //   component: item.component,
  //   meta: {
  //     lang: ['zh-cn'],
  //     title: item.label
  //   }
  // })) : null
  // 将实际的应用挂载到home,vue-router,<router-view>
  let routes = params.map(item => {
    // 初始化真的的路由模块
    return {
      path: item.murl,
      name: item.murl,
      component: () => import(/* webpackChunkName: "[request][index]" */ `@/views${item.mpath}`),
      // component: () => import(/* webpackChunkName: "[request][index]" */ `@/views/admin/${item.murl}/index.vue`),
      meta: {
        lang: ['zh-cn'],
        title: item.label
      }
    }
  })
  // testRoutes = !isBuild && testRoutes ? [...main, ...testRoutes, ...routes] : [...main, ...routes]
  return [{
    path: '/admin',
    name: 'admin',
    component: home,
    children: [...main, ...routes]
    // children: isBuild ? [...main, ...routes] : testRoutes
  }]
}

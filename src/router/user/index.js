const login = () => import(/* webpackChunkName: "login" */ '@/page/login/login')

export default [
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: { title: '登录' }
  }
]

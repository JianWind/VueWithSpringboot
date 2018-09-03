
const main = () => import(/* webpackChunkName: Error */ '@/page/error/main')

export default [
  {
    path: 'main',
    component: main,
    name: 'main',
    meta: { title: '主页' }
  }
]

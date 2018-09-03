
const Error = () => import(/* webpackChunkName: Error */ '@/views/error')

export default [
  {
    path: '/error',
    component: Error,
    name: 'error',
    meta: { title: '页面丢失' }
  }
]

import store from '@/store'
// import testRoutes from './testRoutes'
import generateRoutes from './generateRoutes'

// const isBuild = process.env.NODE_ENV === 'production'

let cacheData = {
  // 保存用户信息到session
  setUser (data) {
    store.commit('UPDATE_USER_INFO', data)
    sessionStorage.setItem('user', JSON.stringify(data))
  },
  // 保存resource到session
  setResource (data) {
    // 开发环境 引入testRoutes
    // let menuResult = !isBuild && testRoutes && testRoutes.length ? [...testRoutes.map(item => ({
    //   label: item.label,
    //   murl: item.murl,
    //   micon: item.micon || ''
    // })), ...data] : data
    store.commit('UPDATE_RESOURCE', data)
    sessionStorage.setItem('resourceData', JSON.stringify(data))
  },
  // 添加路由
  initRoutes (data) {
    let arr = this.getRoutesArr(data)
    return generateRoutes(arr)
  },
  // 取所有叶子节点 return Array
  getRoutesArr (data, arr = []) {
    for (let i in data) {
      if (!data[i].children.length) {
        arr.push(data[i])
      } else {
        this.getRoutesArr(data[i].children, arr)
      }
    }
    return arr
  }
}

export default (data) => {
  cacheData.setUser(data.user)
  cacheData.setResource(data.menuTree)
  return cacheData.initRoutes(data.menuTree) // 路由
}

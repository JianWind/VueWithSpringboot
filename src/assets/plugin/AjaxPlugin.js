import axios from 'axios'
import Qs from 'qs'
import store from '@/store'

// const isBuild = process.env.NODE_ENV === 'production'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.baseURL = store.state.baseUrl
axios.defaults.transformRequest = [function (data) {
  // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  return Qs.stringify(data)
}]

export default {
  install (Vue) {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      store.commit('UPDATE_IS_LOADING', true)
      return config
    }, function (error) {
      // Do something with request error
      store.commit('UPDATE_IS_LOADING', false)
      return Promise.reject(error)
    })
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      store.commit('UPDATE_IS_LOADING', false)
      if (response.data.success) {
        return response
      }
      store.state.needMessage && Vue.prototype.$message(response.data.message, 'bottom')
      if (response.data.code === 401) {
        Vue.prototype.$confirm(`${response.data.message}, 确定将退出登录，是否继续？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Vue.prototype.$message({
            type: 'success',
            message: '退出登录成功!'
          })
          Vue.prototype.utils.logout()
        }).catch(() => {
          Vue.prototype.$message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
        return Promise.reject(response)
      }
      if (!response.data.success && store.state.needReject) {
        return Promise.reject(response)
      }
      return response
    }, function (error) {
      Vue.prototype.$message.error(error.message)
      store.commit('UPDATE_IS_LOADING', false)
      // Do something with response error
      return Promise.reject(error)
    })
    Vue.prototype.$http = axios
    Vue.http = axios
  },
  $http: axios
}

export const $http = axios

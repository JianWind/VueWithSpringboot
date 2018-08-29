/**
 * vuex 方法命名
 */

export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING' // 加载状态
export const UPDATE_IS_LOGIN = 'UPDATE_IS_LOGIN' // 登录状态
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO' // 用户信息
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE' // 导航菜单数据
export const UPDATE_NEED_MESSAGE = 'UPDATE_NEED_MESSAGE' // 请求接口错误是否需要弹窗提示
export const UPDATE_NEED_REJECT = 'UPDATE_NEED_REJECT' // 当response.data.success: false，返回Promise.reject，对应$http的catch()
export const UPDATE_DIC_DATA = 'UPDATE_DIC_DATA' // 字典数据

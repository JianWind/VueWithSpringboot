const isBuild = process.env.NODE_ENV === 'production'
const domain = isBuild ? `http://39.107.75.199:8080` : ''
const path = '/springboot-mybatis'
export default {
  isLoading: false, // 加载状态
  isLogin: false, // 登录状态
  userInfo: {}, // 用户信息
  resourceData: [], // 导航菜单数据
  needMessage: true, // 请求接口错误是否需要弹窗提示
  needReject: true, // 当response.data.success: false，返回Promise.reject，对应$http的catch()
  dicData: {}, // 字典数据
  baseUrl: `${domain}${path}`, // 接口前缀
  uploadUrl: `${domain}${path}/uploadController/upload` // 上传图片接口地址
}

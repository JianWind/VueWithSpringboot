import {
  UPDATE_IS_LOADING,
  UPDATE_IS_LOGIN,
  UPDATE_USER_INFO,
  UPDATE_RESOURCE,
  UPDATE_NEED_MESSAGE,
  UPDATE_NEED_REJECT,
  UPDATE_DIC_DATA
} from './mutation-types'

const mutations = {
  [UPDATE_IS_LOADING] (state, flag) {
    state.isLoading = flag
  },
  [UPDATE_IS_LOGIN] (state, flag) {
    state.isLogin = flag
  },
  [UPDATE_USER_INFO] (state, obj) {
    state.userInfo = obj
  },
  [UPDATE_RESOURCE] (state, arr) {
    state.resourceData = arr
  },
  [UPDATE_NEED_MESSAGE] (state, flag) {
    state.needMessage = flag
  },
  [UPDATE_NEED_REJECT] (state, flag) {
    state.UPDATE_NEED_REJECT = flag
  },
  [UPDATE_DIC_DATA] (state, obj) {
    state.dicData = {...state.dicData, ...obj}
  }
}

export default mutations

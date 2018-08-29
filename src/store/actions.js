export const UpdateIsLoading = ({commit}, isLoading) => {
  commit('UPDATE_IS_LOADING', isLoading)
}
export const UpdateIsLogin = ({commit}, isLogin) => {
  commit('UPDATE_IS_LOGIN', isLogin)
}
export const UpdateUserInfo = ({commit}, obj) => {
  commit('UPDATE_USER_INFO', obj)
}
export const UpdateMenuResource = ({commit}, arr) => {
  commit('UPDATE_RESOURCE', arr)
}

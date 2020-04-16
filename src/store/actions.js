export default {
  // ChangeRoles({ commit, dispatch, state}, role) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', role)
  //     setToken(role)
  //     dispatch('permission/generateRoutes', role, { root: true })
  //     getUserInfo(role).then(response => {
  //       const data = response.data
  //       commit('SET_ROLES', data.roles)
  //       commit('SET_NAME', data.name)
  //       commit('SET_AVATAR', data.avatar)
  //       commit('SET_INTRODUCTION', data.introduction)
  //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
  //       resolve()
  //     })
  //   })
  // }
}

import router from './router'
import store from './store'

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  const token = true
  if (token) { // determine if there has token
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        // next({ ...to, replace: true })
        // next({ path: '/' })
      } else {
        // next()
        // next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
})

import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // 1、
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: () => import('@/components/HelloWorld') // 路由懒加载
    // }

    // { // 有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)
    //   path: '/',
    //   name: 'Index',
    //   component: () => import(/* webpackChunkName: "hello-world" */ '@/components/HelloWorld') // 路由懒加载
    // }

    // 2、
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/components/HelloWorld'], resolve) // 路由懒加载
    }

    // 3、使用require.ensure 异步引入组件
    // require.ensure(dependencies: String[], callback: function(require), chunkName: String)
    // {
    //  path: '/',
    //  name: 'Index',
    //  component: r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello-world')
    // }
  ]
})

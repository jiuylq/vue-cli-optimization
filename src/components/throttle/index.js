/**
 * @description 节流/防抖组件封装
 * @params { Function } fun
 * @params { Number } wait
 * @params { Boolean } isDebounce true or fals 防抖or节流
 * @怕rams { Object } ctx 上下文
*/

// 使用
// import Throttle from '../Throttle'
// Vue.component('Throttle', Throttle)

/* 组件中使用
<Throttle :time="3300" events="mouseleave" :isDebounce="true">
    <button @mouseleave.prevent="onAdd">click+3 {{val}}</button>
</Throttle>
*/

const throttle = function (fn, wait = 50, isDebounce, ctx) {
  let timer
  let lastCall = 0
  return function (...params) {
    if (isDebounce) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(ctx, params)
      }, wait)
    } else {
      const now = new Date().getTime()
      if (now - lastCall < wait) return
      lastCall = now
      fn.apply(ctx, params)
    }
  }
}

export default {
  name: 'Throttle',
  abstract: true,
  props: {
    time: Number,
    events: String,
    isDebounce: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.eventKeys = this.events.split(',')
    this.originMap = {}
    this.throttledMap = {}
  },
  render () {
    const vnode = this.$slots.default[0]
    this.eventKeys.forEach((key) => {
      const target = vnode.data.on[key]
      if (target === this.originMap[key] && this.throttledMap[key]) {
        vnode.data.on[key] = this.throttledMap[key]
      } else if (target) {
        this.originMap[key] = target
        this.throttledMap[key] = throttle(target, this.time, this.isDebounce, vnode)
        vnode.data.on[key] = this.throttledMap[key]
      }
    })
    return vnode
  }
}

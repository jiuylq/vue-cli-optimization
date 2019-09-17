import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'JWT' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // do something with response success
    // 与后端约定一套返回格式，自定义code状态码
    const res = response.data
    // switch (res.code) {
    //   case 1:
    //     break
    //   case 2: //
    //     break
    //   case 3: //
    //     break
    //   case 4: //
    //     break
    //   // ...忽略
    //   default:
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    // error
    // do some with response error
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          break
        case 401: // 会话已失效! 请重新登录
          break
        case 402: // 登陆超时 ！
          break
        case 403: // 没有权限！
          break
        // ...忽略
        default:
      }
    }
    return Promise.reject(error)
  }
)

export default service

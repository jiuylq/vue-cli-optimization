import http from '@/utils/request'
import article from './article'

// 模块合并
const api = Object.assign({}, http, article)
export default api

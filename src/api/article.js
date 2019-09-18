import http from '@/utils/request'
export default {
  A (param) { return http.get('/api/', param) },
  B (param) { return http.post('/api/', param) }
  C (param) { return http.put('/api/', param) },
  D (param) { return http._delete('/api/', {data: param}) },
}

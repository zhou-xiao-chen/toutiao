import axios from 'axios'
import store from '@/store'

const requset = axios.create({
  // baseURL: 'http://geek.itheima.net'
  baseURL: 'http://toutiao.itheima.net'
})

requset.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 切记一定要把config 给返回，否则请求是发布出去的
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default requset

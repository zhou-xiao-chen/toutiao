import axios from 'axios'

const requset = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

export default requset

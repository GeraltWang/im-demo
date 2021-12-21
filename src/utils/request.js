import axios from 'axios'
import store from '@/store'

const request = axios.create({})

// 在请求拦截器中进行token 设置
request.interceptors.request.use((config) => {
  // 获取token
  const { access_token } = store.state.user
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  return config
})

export default request

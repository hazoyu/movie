import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://192.168.255.3:8002',
  timeout: 5000
})


httpInstance.interceptors.request.use(config => {

  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  

  if(e.response.status===401){
    ElMessage({
      type:'warning',
      message:e.response.request.response
    })
  }else{
    ElMessage({
      type:'warning',
      message:e.response.request.response
    })
  
  }
  
  return Promise.reject(e)
})


export default httpInstance
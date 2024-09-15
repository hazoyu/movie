import request from '@/utils/http'

export const getUserAPI = ({username,password}) =>{
  return request({
    url:'/login/getUser',
    params:{
      username,
      password
    }
  })
}
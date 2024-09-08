import request from '@/utils/http'

export const getUserAPI = ({username,password}) =>{
  return request({
    url:'/getUser',
    params:{
      username,
      password
    }
  })
}
import request from '@/utils/http'

export const getRegisterAPI = ({username,password}) =>{
  return request({
    url:'/login/register',
    params:{
      username,
      password
    }
  })
}
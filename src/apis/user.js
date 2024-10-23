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

export const getSaveAPI = ({id,username,birth,sex,phone}) =>{
  return request({
    url:'/login/save',
    method:"POST",
    data:{
      id,
      username,
      birth,
      sex,
      phone
    }
  })
}
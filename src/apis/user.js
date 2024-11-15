import request from '@/utils/http'
//注册
export const getRegisterAPI = ({username,password}) =>{
  return request({
    url:'/login/register',
    params:{
      username,
      password
    }
  })
}
//修改
export const getSaveAPI = ({id,username,birth,sex,phone,avatar,password,role}) =>{
  return request({
    url:'/login/save',
    method:"POST",
    data:{
      id,
      username,
      birth,
      sex,
      phone,
      avatar,
      password,
      role
    }
  })
}
//修改密码
export const getNewAPI = ({id,password}) =>{
  return request({
    url:'/login/save',
    method:"POST",
    data:{
      id,
      password,
    }
  })
}
//用户列表
export const getUserDataAPI = () =>{
  return request({
    url:'/login/list',
  })
}
//查询用户
export const getUserAPI = (id) =>{
  return request({
    url:'/login/getById',
    params:{
      id
    }
  })
}
//删除用户
export const getDelUserAPI = (id) =>{
  return request({
    url:'/login/delOne',
    method:"POST",
    data:{
      id
    }
  })
}
//新增用户
export const getAddUserAPI = ({username,birth,sex,phone,password,role}) =>{
  return request({
    url:'/login/new',
    method:"POST",
    data:{
      username,
      birth,
      sex,
      phone,
      password,
      role
    }
  })
}
import request from '@/utils/http'

//获取影厅列表
export const getScreenListAPI = () =>{ 
  return request({
    url:'/screen/list',
  })
}
//新增影厅
export const getAddScreenAPI = ({name,size,cinemaname}) =>{ 
  return request({
    url:'/screen/new',
    method:"POST",
    data:{
      name,
      size,
      cinemaname
    }
  })
}
//修改影厅
export const getUpDateScreenAPI = ({id,name,size,cinemaname}) =>{
  return request({
    url:"/screen/save",
    method:"POST",
    data:{
      id,
      name,
      size,
      cinemaname
    }
  })
}
//删除影厅
export const getDelScreenAPI = (id) =>{
  return request({
    url:"/screen/delOne",
    method:"POST",
    data:{
      id
    }
  })
}
//获取场次列表
export const getSessionListAPI = () =>{ 
  return request({
    url:'/session/list',
  })
}
//按ID获取场次
export const getSessionAPI = (id) =>{ 
  return request({
    url:'/session/getById',
    params:{
      id
    }
  })
}
//新增场次
export const getAddSessionAPI = ({cinema,addr,hall,movie,time,price}) =>{ 
  return request({
    url:'/session/new',
    method:"POST",
    data:{
      cinema,
      addr,
      hall,
      movie,
      time,
      price
    }
  })
}
//修改场次
export const getUpDateSessionAPI = ({id,cinema,hall,movie,time,price}) =>{
  return request({
    url:"/session/save",
    method:"POST",
    data:{
      id,
      cinema,
      hall,
      movie,
      time,
      price
    }
  })
}
//删除场次
export const getDelSessionAPI = (id) =>{
  return request({
    url:"/session/delOne",
    method:"POST",
    data:{
      id
    }
  })
}
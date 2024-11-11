import request from '@/utils/http'

//获取所有电影院
export const getCinemaAPI = () =>{
  return request({
    url:'/cinema/list',
  })
}

//新增影院
export const getCreateCinemaAPI = ({name,addr}) =>{
  return request({
    url:'/cinema/new',
    method:"POST",
    data:{
      name,
      addr
    }
  })
}
//修改影院
export const getUpDataCinemaAPI = ({id,name,addr}) =>{
  return request({
    url:'/cinema/save',
    method:'POST',
    data:{
      id,
      name,
      addr
    }
  })
}
//删除影院
export const getDelCinemaAPI = (id) =>{
  return request({
    url:'/cinema/delOne',
    method:"POST",
    data:{
      id
    }
  })
}
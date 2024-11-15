import request from '@/utils/http'

//获取所有场次的座位列表
export const getSeatListAPI = () =>{ 
  return request({
    url:'/seat/list',
  })
}

//根据ID获取对应场次的座位列表
export const getSeatAPI = (id) =>{ 
  return request({
    url:'/seat/getById',
    params:{
      id
    }
  })
}

//根据ID新增对应场次的座位列表
export const getNewSeatAPI = (id) =>{ 
  return request({
    url:'/seat/new',
    method:"POST",
    data:{
      id
    }
  })
}
//根据ID修改对应场次的座位列表
export const getUpDataSeatAPI = ({id,seat}) =>{ 
  return request({
    url:'/seat/save',
    method:"POST",
    data:{
      id,
      seat
    }
  })
}
//根据ID删除对应场次的座位列表
//删除热门电影
export const getDelSeatAPI = (id) =>{ 
  return request({
    url:'/seat/delOne',
    method:"POST",
    data:{
      id
    }
  })
}
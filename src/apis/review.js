import request from '@/utils/http'

//所有评论
export const getReviewAPI = () =>{ 
  return request({
    url:'/reviews/list',
  })
}

//新增评论
export const getNewReviewAPI = ({moviename,username,review,time}) =>{ 
  return request({
    url:'/reviews/new',
    method:"POST",
    data:{
      moviename,
      username,
      review,
      time,
    }
  })
}

//删除评论
export const getDelReviewAPI = (id) =>{ 
  return request({
    url:'/reviews/delOne',
    method:"POST",
    data:{
      id
    }
    
  })
}
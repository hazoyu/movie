import request from '@/utils/http'

//新增评论
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
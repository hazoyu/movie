import request from '@/utils/http'

//所有评分
export const getScoreListAPI = () =>{ 
  return request({
    url:'/scorelist/list',
  })
}
//按电影名称查询电影评分
export const getMovieScoreAPI = (moviename) =>{ 
  return request({
    url:'/scorelist/getMoviename',
    params:{
      moviename
    }
  })
}
//新增电影评分
export const getAddScoreAPI = ({username,moviename,score}) =>{ 
  return request({
    url:'/scorelist/new',
    method:'POST',
    data:{
      username,
      moviename,
      score
    }
  })
}

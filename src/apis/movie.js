import request from '@/utils/http'

export const getMovieHotAPI = () =>{
  return request({
    url:'/moviehot2/list',
  })
}

export const getMovieFutureAPI = () =>{
  return request({
    url:'/moviefuture/list',
  })
}

export const getMovieBoxOfficeAPI = () =>{
  return request({
    url:'/movieboxoffice/list'
  })
}

export const getMovieDetailAPI = (id) =>{
  return request({
    url:'/moviehot2/getById',
    params:{
      id
    }
  })
}

//获取热门电影
export const getHotMovieAPI = () =>{ 
  return request({
    url:'/moviehot2/list',
  })
}
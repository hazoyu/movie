import request from '@/utils/http'

export const getMovieHotAPI = () =>{
  return request({
    url:'/moviehot/list',
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
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
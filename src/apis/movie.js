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
//获取即将上映
export const getFutureMovieAPI = () =>{ 
  return request({
    url:'/moviefuture/list',
  })
}
//修改热门电影
export const getSaveHotMovieAPI = ({url,title,score,director,actor,kind,region,language,length,id,detail}) =>{ 
  return request({
    url:'/moviehot2/save',
    method:"POST",
    data:{
      url,
      title,
      score,
      director,
      actor,
      kind,
      region,
      language,
      length,
      id,
      detail
    }
  })
}
//新增热门电影
export const getnewHotMovieAPI = ({url,title,score,director,actor,kind,region,language,length,detail}) =>{ 
  return request({
    url:'/moviehot2/new',
    method:"POST",
    data:{
      url,
      title,
      score,
      director,
      actor,
      kind,
      region,
      language,
      length,
      detail
    }
  })
}
//删除热门电影
export const getDelHotMovieAPI = (id) =>{ 
  return request({
    url:'/moviehot2/delOne',
    method:"POST",
    data:{
      id
    }
    
  })
}


//修改即将上映电影
export const getUpdataFutureMovieAPI = ({url,title,director,actor,kind,region,language,length,rel,detail,id}) =>{ 
  return request({
    url:'/moviefuture/save',
    method:"POST",
    data:{
      url,
      title,
      director,
      actor,
      kind,
      region,
      language,
      length,
      rel,
      detail,
      id
    }
  })
}
//新增即将上映电影
export const getnewFutureMovieAPI = ({url,title,director,actor,kind,region,language,length,detail,rel}) =>{ 
  return request({
    url:'/moviefuture/new',
    method:"POST",
    data:{
      url,
      title,
      director,
      actor,
      kind,
      region,
      language,
      length,
      detail,
      rel,
    }
  })
}

//删除即将上映电影
export const getDelFutureMovieAPI = (id) =>{ 
  return request({
    url:'/moviefuture/delOne',
    method:"POST",
    data:{
      id
    }
    
  })
}
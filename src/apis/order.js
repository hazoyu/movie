import request from '@/utils/http'

//获取所有订单
export const getOrderListAPI = () =>{
  return request({
    url:'/orderlist/list',
  })
}
//新增订单
export const getCreateOrderAPI = ({id,user,movie,movieurl,cinema,hall,buytime,time,seat,price}) =>{
  return request({
    url:'/orderlist/new',
    method:"POST",
    data:{
      id,
      user,
      movie,
      movieurl,
      cinema,
      hall,
      buytime,
      time,
      seat,
      price
    }
  })
}
//删除订单
export const getDelOrderAPI = (id) =>{
  return request({
    url:'/orderlist/delOne',
    method:"POST",
    data:{
      id
    }
  })
}
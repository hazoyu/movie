import request from '@/utils/http'

//获取所有订单
export const getOrderListAPI = () =>{
  return request({
    url:'/orderlist/list',
  })
}
//新增订单
export const getCreateOrderAPI = ({id,movie,movieurl,cinema,hall,buytime,time,seat,price}) =>{
  return request({
    url:'/orderlist/new',
    method:"POST",
    data:{
      id,
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
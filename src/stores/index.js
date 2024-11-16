import { ref, computed,watch } from 'vue'
import { defineStore } from 'pinia'
import { getSaveAPI,getNewAPI } from '@/apis/user';
import { getCinemaAPI } from '@/apis/cinema';
import {getScreenListAPI} from '@/apis/screen'
import { getOrderListAPI,getCreateOrderAPI } from '@/apis/order';
import { getUpDataSeatAPI } from '@/apis/seat';
import { getUserAPI } from '@/apis/login';

function init () {
  return {
    isCollapse:false, //折叠
    user:{},
    cinemaList:[],
    screenList:[],
    orders:[],
    order:{},
    seat:{}
  }
}

export const useAllDataStore = defineStore('allAata', () => {
  const state = ref(init())

  // watch(state,(newObj)=>{
  //   if(!newObj?.user) return
  //   localStorage.setItem('store',JSON.stringify(newObj))
  // },{
  //   deep:true
  // })

  // const stored = ()=>{
  //   if (JSON.parse(localStorage.getItem('store'))){
  //     state.value=JSON.parse(localStorage.getItem('store'))
  //   }
  // }
  
  //登录
  const login =async ({username,password})=>{
    const res = await getUserAPI({ username, password })
    state.value.user = res.result
    ElMessage({ type: 'success', message: '登录成功' })
}
  //保存个人信息
  const save = async (data)=>{
    const {id,avatar} = state.value.user
    const data2 ={}
    Object.assign(data2,{...data,id,avatar})
    const res = await getSaveAPI(data2)
    console.log(state.value.user);
    console.log(res);
    if (res) {
      state.value.user.username = res.username
      state.value.user.sex = res.sex
      state.value.user.birth = res.birth
      state.value.user.phone = res.phone
      ElMessage({
        type:'success',
        message:"保存成功"
      })
    }
  }
  //修改密码
  const revise = async (password)=>{
    const {id} = state.value.user
    const data ={}
    Object.assign(data,{password,id})
    console.log(data);
    const res = await getNewAPI(data)
    console.log(res);
    if (res) {
      state.value.user.password = password
      ElMessage({
        type:'success',
        message:"修改成功"
      })
    }
  }
  //获取影院列表
  const cinemaList = async()=>{
    const res = await getCinemaAPI()
    state.value.cinemaList = res
  }
  //获取影厅列表
  const screenList = async()=>{
    const res = await getScreenListAPI()
    state.value.screenList = res
  }
  //获取对应用户的订单
  const order = async ()=>{
    const res = await getOrderListAPI()
    state.value.orders = res
  }
  //保存选座的信息
  const info = (seat,order)=>{
    state.value.order = order
    state.value.seat = seat
  }
  //更新场次座位
  const updataSeat = async()=>{
    await getUpDataSeatAPI(state.value.seat)
  }
  //保存订单
  const saveOrder = async () =>{
    await getCreateOrderAPI(state.value.order)
  }
  return {
    state,
    login,
    save,
    revise,
    cinemaList,
    screenList,
    saveOrder,
    info,
    order,
    updataSeat
  }
},
{
    persist: true, //持久化配置
})

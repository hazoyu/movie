import { ref, computed,watch } from 'vue'
import { defineStore } from 'pinia'
import { getSaveAPI } from '@/apis/user';



function init () {
  return {
    isCollapse:false, //折叠
    user:null
    
  }
}

export const useAllDataStore = defineStore('allAata', () => {
  const state = ref(init())

  watch(state,(newObj)=>{
    if(!newObj?.user) return
    localStorage.setItem('store',JSON.stringify(newObj))
  },{
    deep:true
  })

  const stored = ()=>{
    if (JSON.parse(localStorage.getItem('store'))){
      state.value=JSON.parse(localStorage.getItem('store'))
    }
  }
  const save = async (data)=>{
    const {id,avatar} = state.value.user
    const data2 ={}
    Object.assign(data2,{...data,id,avatar})
    const res = await getSaveAPI(data2)
    console.log(state.value.user,avatar);
    console.log(res);
    if (res) {
      state.value.user.name = data.name
      state.value.user.sex = data.sex
      state.value.user.birth = data.birth
      state.value.user.phone = data.phone
      ElMessage({
        type:'success',
        message:"保存成功"
      })
    }
  }
  return {
    state,
    stored,
    save
  }
})

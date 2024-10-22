import { ref, computed,watch } from 'vue'
import { defineStore } from 'pinia'


function init () {
  return {
    isCollapse:false, //折叠
    user:null,
  }
}

export const useAllDataStore = defineStore('allAata', () => {
  const state = ref((init()))

  watch(state,(newObj)=>{
    if(!newObj.user) return
    localStorage.setItem('store',JSON.stringify(newObj))
  },{
    deep:true
  })

  const stored = ()=>{
    state.value=JSON.parse(localStorage.getItem('store'))
  }

  return {
    state,
    stored
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function init () {
  return {
    isCollapse:false, //折叠
  }
}

export const useAllDataStore = defineStore('allAata', () => {
  const state = ref((init()))

  return {
    state,
  }
})

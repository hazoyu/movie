import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAllDataStore } from './stores'
import App from './App.vue'
import router from './router'
import '@/styles/common.css'
const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(createPinia())
app.use(router)
const store = useAllDataStore()
store.stored()
app.mount('#app')

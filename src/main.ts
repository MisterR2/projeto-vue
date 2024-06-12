// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts'
import './assets/css/tailwind.css'

createApp(App).use(router).mount('#app')

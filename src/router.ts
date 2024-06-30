// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pratos from './views/Pratos.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
  },
  { 
    path: '/cardapio', 
    component: Pratos, 
    name: "Cardapio",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
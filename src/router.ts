// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Pratos from './views/Pratos.vue'
import Cozinha from './views/Cozinha.vue'

const routes = [
  { 
    path: '/pedidos', 
    component: Home,
  },
  { 
    path: '/', 
    component: Pratos, 
    name: "Cardapio",
  },
  { 
    path: '/cozinha', 
    component: Cozinha, 
    name: "Cozinha",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
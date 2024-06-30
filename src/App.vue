<template class="dark ">
  <div id="app">
    <div class="flex divide-x-2">
        <router-link  to="/"><button class="hover:bg-slate-600 p-5 transition-all duration-300">Pedidos</button></router-link>
      
        <router-link to="/cardapio"><button class="hover:bg-slate-600 p-5 transition-all duration-300">Cardápio</button></router-link>
        <router-link to="/cozinha"><button class="hover:bg-slate-600 p-5 transition-all duration-300">Gestão</button></router-link>
    </div>
    <div class="p-2">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
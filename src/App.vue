<template class="dark ">
  <div id="app">
    <div class="flex divide-x-2">
        <router-link to="/"><button class="hover:bg-green-600 p-5 transition-all duration-300 hover:text-white">Cardápio</button></router-link>
        <router-link  to="/pedidos"><button class="hover:bg-green-600 p-5 transition-all duration-300 hover:text-white">Pedidos</button></router-link>
      
        <router-link to="/cozinha"><button class="hover:bg-green-600 p-5 transition-all duration-300 hover:text-white">Gestão</button></router-link>
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
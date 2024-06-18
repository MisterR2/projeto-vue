<template class="dark ">
  <div id="app">
    <div class="flex divide-x-2">
        <router-link  to="/"><button class="hover:bg-violet-600 p-5 transition-all duration-300">Home</button></router-link>
      
        <router-link to="/pratos"><button class="hover:bg-violet-600 p-5 transition-all duration-300">About</button></router-link>
      
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
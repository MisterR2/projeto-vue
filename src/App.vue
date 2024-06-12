<template class="dark">
  <div id="app">
    <button class="bg-[#1da1f2] text-white">
      <router-link to="/">Home</router-link>
    </button>
      
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
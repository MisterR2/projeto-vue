<template>
  <div>
    <h1 class="text-3xl font-bold font-sans">Suas comandas</h1>
    <Comanda></Comanda>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Comanda from "./Comanda.vue";
  import Pratos from "./Pratos.vue";
  
  export default defineComponent({
    name: 'Home',
    components: { Comanda, Pratos },
    data() {
      return {
      };
    },
    methods: {
    
    }
  });
</script>

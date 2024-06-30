<template>
  <div class="gap-4">
    <h1 class="text-3xl font-bold font-sans">Suas comandas</h1>
    <Comanda></Comanda>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Comanda from "./Comanda.vue";
  import Pratos from "./Pratos.vue";

  interface Prato {
    name: string;
    price: number;
    quantity: number;
    description?: string;
  }

  

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

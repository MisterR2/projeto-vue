<template>
    <div>
      <h1 class="text-3xl font-bold font-sans">Suas comandas</h1>
      <Comanda :items="comandas" @remove-item="removeItem"  ></Comanda>
      
      <button class="p-2 bg-blue-500 text-white rounded-md my-5" @click="toggleMenu">Nova comanda</button>
      
      <div v-if="menu" class="divide-y">
        <input type="number" placeholder="Mesa" class="border border-sky-500 rounded" v-model="novaComanda.mesa">
        <input type="string" placeholder="Status" class="border border-sky-500 rounded" v-model="novaComanda.status">
        <Pratos :options="optionsList" @optionSelected="handleSelection"></Pratos> <br>
        <button @click="addItem" class="ml-2 p-2 bg-blue-500 text-white rounded-md">Add</button>
      </div>
    </div>

  </template>
  
<script lang="ts">
  import { defineComponent } from 'vue'
  import Comanda from "./Comanda.vue";
  import Pratos from "./Pratos.vue";

  export default defineComponent({
    name: 'Home',
    components: { Comanda, Pratos},
    data() {
      return {
        comandas: [] as Object[],
        novaComanda: {
          mesa: Number,
          pratos: [] as String[],
          status: "",
        },
        optionsList: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
        selectedOption: '',
        menu: false
      };
    },
    methods: {
    addItem() {
      if (Object.keys(this.novaComanda).length !== 0 && this.novaComanda.pratos.length !== 0) {
        this.comandas.push(this.novaComanda);
      }
    },
    removeItem(index: number) {
      this.comandas.splice(index, 1);
    },
    toggleMenu(){
      this.menu = !this.menu
    },
    handleSelection(selectedOption: string) {
      // console.log('Opção selecionada no componente pai:', selectedOption);
      this.novaComanda.pratos.push(selectedOption)
      console.log(this.novaComanda.pratos)
    },
  }
})
</script>


<!-- src/views/About.vue -->
<template>
    <div>
      <h1 class="text-3xl font-bold">Cardápio</h1>
      <table class="table-auto text-center" v-if="dishes.length>0">
      <thead>
        <tr class="border-collapse border border-slate-500">
          <th class="border-collapse border border-slate-500">Prato</th>
          <th class="border-collapse border border-slate-500">Descrição</th>
          <th class="border-collapse border border-slate-500">Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-collapse border border-slate-500" v-for="(dish, index) in dishes" :key="index">
          <td class="border-collapse border border-slate-500">{{ dish.name }}</td>
          <td class="border-collapse border border-slate-500">
            <span v-if="dish.description">{{ dish.description }}</span>
            <span v-else>-</span>
          </td>
          <td class="border-collapse border border-slate-500">{{ dish.price }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Não há items no cardápio</p>
    <button class="p-2 bg-green-500 text-white rounded-md my-5" @click="toggleMenu">Nova comanda</button>
    <div v-if="menu" class="w-80 flex-col p-2 gap-4 container flex border border-green-500 rounded">
      <input type="string" placeholder="Nome" class="border border-green-500 rounded" v-model="newDish.name">
      <input type="number" placeholder="Preço" class="border border-green-500 rounded" v-model="newDish.price">
      
      <button @click="addDish" class="m-2 p-2 bg-green-500 text-white rounded-md disabled:bg-green-300">Adicionar Pedido</button>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  interface Prato {
    name: string;
    price: number;
    quantity?: number;
    description?: string;
  }

  export default defineComponent({
    name: 'Cardapio',
    data(){
      return{
        dishes: [] as Prato[],
        visible: false,
        menu: false,
        newDish: {
          name: "",
          price: 0,
          description: '',
        } as Prato,
      };
    }, 
    methods: {
      toggleMenu() {
        this.menu = !this.menu;
      },
      saveDishesToLocalStorage() {
        localStorage.setItem('pratos', JSON.stringify(this.dishes));
      },
      loadDishesFromLocalStorage() {
        const pratos = localStorage.getItem('pratos');
        if (pratos) {
          this.dishes = JSON.parse(pratos);
        }
      },
      addDish(){
        if (this.newDish.name && this.newDish.price) {
          this.dishes.push({...this.newDish})
          this.$emit('dishAdded', this.dishes);
        }
      }
    },
    mounted() {
      this.loadDishesFromLocalStorage();
    }
  })


  </script>
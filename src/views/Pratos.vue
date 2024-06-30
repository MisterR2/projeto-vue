<template>
  <template v-if="!($route.name === 'Cardapio')">
    <div class="gap-4 flex flex-col">
      <div>
        Prato:
        <select name="" id="" v-model="dish" class="border border-green-500 rounded w-100">
            <template v-if="options.length>0">
              <option v-for="(option, index) in options" :key="index" :value="option">{{ option.name }} - {{ option.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }} <br> 
              </option>
            </template>
            <template v-else>
              <option value="" disabled>Não há pratos cadastrados</option>
            </template>
        </select>
      </div>
      
      <div class="flex flex-row gap-1 items-center">
        <label for="quantity">Quantidade: </label>
        <input type="number" name="" id="quantity" v-model="quantity" class="border border-green-500 rounded w-10">
        <div class="flex flex-row gap-1">
          <button @click="inc()"  :disabled="!dish" class="p-1 bg-green-500 text-white rounded-md disabled:bg-green-300">+</button>
          <button @click="dec()"  :disabled="!dish" class="p-1 bg-red-500 text-white rounded-md disabled:bg-green-300">-</button>
        </div>
      </div>
    </div>
    <button @click="emitSelection" :disabled="!dish" class="ml-2 p-2 bg-green-500 text-white rounded-md disabled:bg-green-300">Add</button>
  </template>
  <template v-else>
    <div>
      <h1 class="text-3xl font-bold">Cardápio</h1>
      <table class="table-auto text-center" v-if="dishes.length>0">
      <thead>
        <tr class="border-collapse border border-slate-500">
          <th class="border-collapse border border-slate-500">Prato</th>
          <th class="border-collapse border border-slate-500">Descrição</th>
          <th class="border-collapse border border-slate-500">Preço</th>
          <th class="border-collapse border border-slate-500">Remover do cardápio</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-collapse border border-slate-500" v-for="(dish, index) in dishes" :key="index">
          <td class="border-collapse border border-slate-500">{{ dish.name }}</td>
          <td class="border-collapse border border-slate-500">
            <span v-if="dish.description">{{ dish.description }}</span>
            <span v-else>-</span>
          </td>
          <td class="border-collapse border border-slate-500">{{ dish.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}</td>
          <td class="border-collapse border border-slate-500"><button @click="removeItem(index)" class="ml-2 text-red-500 hover:text-red-700">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else>Não há items no cardápio</p>
    <button class="p-2 bg-green-500 text-white rounded-md my-5" @click="toggleMenu">Novo prato</button>
    <div v-if="menu" class="w-80 flex-col p-2 gap-4 container flex border border-green-500 rounded">
      <input type="string" placeholder="Nome" class="border border-green-500 rounded" v-model="newDish.name">
      <input type="number" placeholder="Preço" class="border border-green-500 rounded" v-model="newDish.price">
      <textarea name="" id="" placeholder="Descrição" class="border border-green-500 rounded" v-model="newDish.description"></textarea>
      <button @click="addDish" class="m-2 p-2 bg-green-500 text-white rounded-md disabled:bg-green-300" :disabled="newDish.price<=0 || !newDish.name">Adicionar Prato</button>
    </div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

  interface Prato {
    name: string;
    price: number;
    quantity?: number;
    description?: string;
  }

export default defineComponent({
  name: 'Pratos',
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
        dish: {},
        quantity: 1,
    };
  }, 
  props: {
    options: {
      type: Array as () => Array<{ name: string; price: number, quantity?: number, description?: string }>,
      required: true
    }
  },
  methods: {
    emitSelection() {
      this.$emit('optionSelected', this.dish, this.quantity);
    },
    inc(){
      if (this.quantity > 0) {
        this.quantity+=1
      }
    },
    dec(){
      if (this.quantity > 1) {
        this.quantity-=1
      }
    },
    removeDish(dishIndex: number) {
        this.dishes.splice(dishIndex, 1);
      },
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
        if (this.newDish.name && this.newDish.price > 0) {
          this.dishes.push({...this.newDish})
          this.$emit('dish-added', this.dishes);
          this.saveDishesToLocalStorage();
          this.resetMenu()
        }
      },
      resetMenu() {
        this.newDish = {
          name: "",
          price: 0,
        };
      },
      removeItem(index: number) {
        this.dishes.splice(index, 1);
        this.saveDishesToLocalStorage();
      },
  },
  mounted() {
    this.loadDishesFromLocalStorage();
  }
  
});
</script>
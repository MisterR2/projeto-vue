<template>
  <table class="table-auto text-center" v-if="items.length>0">
  <thead>
    <tr class="border-collapse border border-slate-500">
      <th class="border-collapse border border-slate-500">Mesa</th>
      <th class="border-collapse border border-slate-500">Pratos</th>
      <th class="border-collapse border border-slate-500">Status do Pedido</th>
      <th class="border-collapse border border-slate-500">Total do Pedido</th>
      <th class="border-collapse border border-slate-500">Remover Pedido</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-collapse border border-slate-500" v-for="(item, index) in items" :key="index">
      <td class="border-collapse border border-slate-500">Mesa {{ item.mesa }}</td>
      <td class="border-collapse border border-slate-500">
        <ul>
          <li v-for="(dish, index) in item.pratos">
            {{ dish.name }} - {{ (dish.quantity*dish.price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }} (x{{ dish.quantity }} - {{ dish.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }})
          </li>
        </ul></td>
      <td class="border-collapse border border-slate-500">{{ item.status }}</td>
      <td class="border-collapse border border-slate-500">{{ item.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}</td>
      <td class="border-collapse border border-slate-500"><button @click="$emit('remove-item', index)" class="ml-2 text-red-500 hover:text-red-700">Remove</button></td>
    </tr>
  </tbody>
</table>
<p class="my-5" v-if="items.length == 0">Não há comandas cadastradas</p>
  </template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router';

    interface Prato {
      name: string;
      price: number;
      quantity: number;
      description?: string;
    }

    interface Comanda {
      mesa: number;
      pratos: Prato[];
      status: string;
      total: number,
    }

  export default defineComponent({
    name: 'Comanda',
    props: {
        items: {
          type: Array as () => Comanda[],
          required: true,
        },
        
    },
    methods:{
      calculateValue(){
        this.$props.items.forEach(item => {
          let value = 0;
          item.pratos.forEach(dish => {
            value += (dish.price * dish.quantity)
          });
          item.total=value
        });
      },
    },
    mounted() {
      this.calculateValue();
    },
    watch: {
      items: {
        handler() {
          this.calculateValue();
        },
        deep: true,
      },
    },
  })
</script>
<template>
  <table class="table-auto text-center" v-if="items.length>0">
  <thead>
    <tr class="border-collapse border border-slate-500">
      <th class="border-collapse border border-slate-500">Mesa</th>
      <th class="border-collapse border border-slate-500">Pratos</th>
      <th class="border-collapse border border-slate-500">Status do Pedido</th>
      <th class="border-collapse border border-slate-500">Remover Pedido</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-collapse border border-slate-500" v-for="(item, index) in items" :key="index">
      <td class="border-collapse border border-slate-500">Mesa {{ item.mesa }}</td>
      <td class="border-collapse border border-slate-500">
        <ul>
          <li v-for="(dish, index) in item.pratos">
            {{ dish }}
          </li>
        </ul></td>
      <td class="border-collapse border border-slate-500">{{ item.status }}</td>
      <td class="border-collapse border border-slate-500"><button @click="$emit('remove-item', index)" class="ml-2 text-red-500 hover:text-red-700">Remove</button></td>
    </tr>
  </tbody>
</table>
<p class="my-5" v-if="items.length == 0">Não há comandas cadastradas</p>
  </template>
<script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Comanda',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
  })
</script>
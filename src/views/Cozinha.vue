<!-- src/views/About.vue -->
<template>
  <div class="gap-4">
    <h1 class="text-3xl font-bold font-sans">Gestão de pedidos</h1>
    <div class="flex flex-row p-3 gap-x-2">
      <div class="border border rounded border-green-900 p-4 flex flex-col text-center" v-for="comanda in filteredComandas" :key="comanda.mesa">
        <h2 class="text-2l font-bold font-sans">Mesa {{ comanda.mesa }}</h2>
        <table class="table-auto mb-2">
          <tr v-for="dish in comanda.pratos" class="odd:bg-green-100 even:bg-white-50">
            <td class="border-collapse border border-slate-500 p-1">{{ dish.name }}</td>
            <td class="border-collapse border border-slate-500 p-1">{{ dish.quantity }}</td>
          </tr>
        </table>
        Status:
        <select name="" @change="saveOrdersToLocalStorage" id="" v-model="comanda.status" class="border border-green-500 rounded">
          <option value="Recebido" selected>Recebido</option>
          <option value="Em preparo">Em preparo</option>
          <option value="Entregue">Entregue</option>
        </select>
      </div>
    </div>
    <span v-if="filteredComandas.length==0">Não há comandas cadastradas</span>

  </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue'
  import Swal from 'sweetalert2'

  // Import one of the available themes
  //import 'vue-toast-notification/dist/theme-default.css';
  import 'vue-toast-notification/dist/theme-bootstrap.css';
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
    }

  export default defineComponent({
    name: 'Cardapio',
    data(){
      return{
        comandas: [] as Comanda[],
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
      saveOrdersToLocalStorage() {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido atualizado",
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('comandas', JSON.stringify(this.comandas));
        this.loadOrdersFromLocalStorage()
      },
      loadOrdersFromLocalStorage() {
        const comandas = localStorage.getItem('comandas');
        if (comandas) {
          this.comandas = JSON.parse(comandas);
        }
      },
      
    },
    mounted() {
      this.loadOrdersFromLocalStorage();
    },
    computed: {
      filteredComandas() {
        return this.comandas.filter(comanda => comanda.status != 'Entregue');
      }
    }
  })


  </script>
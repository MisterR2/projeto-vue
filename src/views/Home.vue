<template>
  <div class="gap-4">
    <h1 class="text-3xl font-bold font-sans">Suas comandas</h1>
    <Comanda :items="comandas" @remove-item="removeItem" @add-item="inc" @subtract-item="dec"></Comanda>
    
    <button class="p-2 bg-green-500 text-white rounded-md my-5" @click="toggleMenu">Nova comanda</button>
    
    <div v-if="menu" class="w-80 flex-col p-2 gap-4 container flex border border-green-500 rounded">
      <input type="number" placeholder="Mesa" class="border border-green-500 rounded" v-model="novaComanda.mesa" min="1">
      <select name="" id="" v-model="novaComanda.status" class="border border-green-500 rounded">
        <option value="Recebido" selected>Recebido</option>
        <option value="Em preparo">Em preparo</option>
        <option value="Entregue">Entregue</option>
      </select>
      <!-- <input type="string" placeholder="Status" class="border border-green-500 rounded" v-model="novaComanda.status"> -->
      <Pratos :options="dishes" @optionSelected="handleSelection" @dish-added="addOption"></Pratos> 
      <div v-if="novaComanda.pratos.length > 0" class="border border rounded border-green-900 p-4 flex flex-col">
        <span class="rounded p-2 text-white bg-slate-500 text-sm m-2 flex justify-between" v-for="(dish, dishIndex) in novaComanda.pratos" :key=dishIndex>{{ dish.name }} - {{ dish.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }} (x{{ dish.quantity }})
          <div class="flex flex-row gap-1">
            <button @click="inc(dishIndex)" class="p-1 bg-green-500 text-white rounded-md disabled:bg-green-300">+</button>
            <button @click="dec(dishIndex)" class="p-1 bg-red-500 text-white rounded-md disabled:bg-green-300">-</button>
          </div>
        </span>
      </div>
      <button @click="addItem" class="m-2 p-2 bg-green-500 text-white rounded-md disabled:bg-green-300" :disabled="!(novaComanda.mesa) || !(novaComanda.status)">Adicionar Pedido</button>
    </div>
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

  interface Comanda {
    mesa: number;
    pratos: Prato[];
    status: string;
  }

  export default defineComponent({
    name: 'Home',
    components: { Comanda, Pratos },
    data() {
      return {
        comandas: [] as Comanda[],
        novaComanda: {
          mesa: 0,
          pratos: [] as Prato[],
          status: "",
        } as Comanda,
        dishes: [] as Prato[],
        selectedOption: '',
        menu: false,
        mesaToSearch: null as number | null,
        searchedComanda: null as Comanda | null | undefined
      };
    },
    methods: {
      addItem() {
        const existingComanda = this.findComandaByMesa(this.novaComanda.mesa);
        if (existingComanda) {
          existingComanda.status = this.novaComanda.status;
          this.novaComanda.pratos.forEach(novoPrato => {
            const existingPrato = existingComanda.pratos.find(prato => prato.name === novoPrato.name);
            if (existingPrato) {
              existingPrato.quantity = (existingPrato.quantity || 1) + (novoPrato.quantity || 1);
            } else {
              existingComanda.pratos.push({ ...novoPrato, quantity: novoPrato.quantity || 1 });
            }
          });
        } else {
          const novaComandaCopy = { 
            ...this.novaComanda, 
            pratos: this.novaComanda.pratos.map(prato => ({ ...prato, quantity: prato.quantity || 1 }))
          };
          if (novaComandaCopy.pratos.length && novaComandaCopy.mesa > 0 && novaComandaCopy.status) {
            this.comandas.push(novaComandaCopy);
          }
        }
        this.saveComandasToLocalStorage();
        this.resetNovaComanda();
      },
      removeItem(index: number) {
        this.comandas.splice(index, 1);
        this.saveComandasToLocalStorage();
      },
      removeDish(dishIndex: number, comandaIndex?: number) {
        let comanda
        if (comandaIndex) {
          comanda = this.comandas[comandaIndex]
        } else {
          comanda = this.novaComanda
        }
        comanda.pratos.splice(dishIndex, 1);
      },
      toggleMenu() {
        this.menu = !this.menu;
      },
      handleSelection(selectedOption: Prato, quantity: number) {
        const pratoExistente = this.novaComanda.pratos.find(prato => prato.name === selectedOption.name);
        if (pratoExistente) {
          pratoExistente.quantity = (pratoExistente.quantity || 1) + quantity;
        } else {
          if (selectedOption.name && selectedOption.price) {
            this.novaComanda.pratos.push({ ...selectedOption, quantity });
          }
        }
        console.log(this.novaComanda.pratos);
      },
      resetNovaComanda() {
        this.novaComanda = {
          mesa: 0,
          pratos: [] as Prato[],
          status: "",
        };
      },
      saveComandasToLocalStorage() {
        localStorage.setItem('comandas', JSON.stringify(this.comandas));
      },
      loadComandasFromLocalStorage() {
        const comandas = localStorage.getItem('comandas');
        if (comandas) {
          this.comandas = JSON.parse(comandas);
        }
      },
      findComandaByMesa(mesa: number) {
        return this.comandas.find(comanda => comanda.mesa === mesa);
      },
      searchComanda() {
        if (this.mesaToSearch !== null) {
          this.searchedComanda = this.findComandaByMesa(this.mesaToSearch);
        }
      },
      inc(pratoIndex: number, comandaIndex?: number) {
       
        if (comandaIndex) {
          const selectedComanda = this.comandas[comandaIndex];
          
          if (pratoIndex >= 0 && pratoIndex < selectedComanda.pratos.length) {
            const selectedPrato = selectedComanda.pratos[pratoIndex];

            if (selectedPrato.quantity && selectedPrato.quantity > 0) {
              selectedPrato.quantity += 1;
            }
          }
        }else{
          const selectedComanda = this.novaComanda;
          
          if (pratoIndex >= 0 && pratoIndex < selectedComanda.pratos.length) {
            const selectedPrato = selectedComanda.pratos[pratoIndex];

            if (selectedPrato.quantity && selectedPrato.quantity > 0) {
              selectedPrato.quantity += 1;
            }
          }
        }
      },
      dec(pratoIndex: number, comandaIndex?: number) {
       
       if (comandaIndex) {
         const selectedComanda = this.comandas[comandaIndex];
         
         if (pratoIndex >= 0 && pratoIndex < selectedComanda.pratos.length) {
           const selectedPrato = selectedComanda.pratos[pratoIndex];

          if (selectedPrato.quantity && selectedPrato.quantity > 1) {
            selectedPrato.quantity -= 1;
          }else if (selectedPrato.quantity && selectedPrato.quantity == 1) {
            this.removeDish(pratoIndex)
          }
         }
       }else{
         const selectedComanda = this.novaComanda;
         console.log("Comanda índice número: ", comandaIndex)
         if (pratoIndex >= 0 && pratoIndex < selectedComanda.pratos.length) {
           const selectedPrato = selectedComanda.pratos[pratoIndex];

          if (selectedPrato.quantity && selectedPrato.quantity > 1) {
            selectedPrato.quantity -= 1;
          }else if (selectedPrato.quantity && selectedPrato.quantity == 1) {
            this.removeDish(pratoIndex)
          }

         }
       }
     },
    addOption(dish: Prato) {
      this.dishes.push({...dish})
      console.log("Chegou")
    },
    },
    mounted() {
      const pratos = localStorage.getItem('pratos');
      if (pratos) {
        this.dishes = JSON.parse(pratos);
      }
      this.loadComandasFromLocalStorage();
    }
  });
</script>

<template>
    <select name="" id="" v-model="dish">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        
    </select>
    <button @click="emitSelection" class="ml-2 p-2 bg-blue-500 text-white rounded-md">Add</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectComponent',
  data(){
    return{
        dish: "",
    };
  }, 
  props: {
    
    options: {
      type: Array as () => string[],
      required: true
    }
  },
  methods: {
    emitSelection(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('optionSelected', this.dish);
    },
  }
});
</script>
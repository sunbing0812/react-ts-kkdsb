<template>
  <div class="add">
    <input type="text" v-model="value" placeholder="请输入" />
    <button @click="add">add</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "add",
  emits:[
      'add'
  ],
  setup(props,context) {
    const value = ref("");
    const {emit}=context


    const add=()=>{
        if(!value.value) return
        emit('add',value.value)
        value.value=''
    }

    return {
      value,
      add
    };
  },
});
</script>

<style lang="scss" scoped>
.add{
    margin: 10px;
    button{
        margin-left: 10px;
    }
}
</style>
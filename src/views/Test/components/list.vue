<template>
  <div class="list">
    <template v-for="val in list" :key="val.id">
      <li :class="{ finish: val.state === 'finish' }" >
        {{ val.event }}
        <button v-show="val.state === 'todo'" @click="finish(val)">完成</button>
      </li>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "list",
  props: {
    list: Array,
    selected:String
  },
  emits: ["finish"],
  setup(props, context) {
    const { emit } = context;

    const finish = (val) => {
      emit("finish", val);
    };

    return {
      finish,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  margin: 10px;
  button {
    margin-left: 10px;
  }
  .finish {
    text-decoration-line: line-through;
  }
}
</style>
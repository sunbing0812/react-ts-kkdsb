<template>
  <div class="selected">
    <button
      v-for="val in select"
      :key="val.key"
      :class="{ active: val.key === selected }"
      @click="change(val.key)"
    >
      {{ val.name }}
    </button>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
  name: "selected",
  props: {
    selected: String,
  },
  emits: ["changeSelected"],
  setup(props, context) {
    const { emit } = context;
    const select = reactive([
      {
        name: "全部",
        key: "all",
      },
      {
        name: "待完成",
        key: "todo",
      },
      {
        name: "完成",
        key: "finish",
      },
    ]);

    const change = (key) => {
      emit("changeSelected", key);
    };

    return {
      select,
      change,
    };
  },
});
</script>

<style lang="scss" scoped>
.selected {
  margin: 10px;
  .active {
    background: coral;
  }
}
</style>
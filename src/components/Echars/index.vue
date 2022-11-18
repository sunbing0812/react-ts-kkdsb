<template>
  <div ref="box" style="width: 100%; height: 100%"></div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
} from "@vue/runtime-core";
import * as echarts from "echarts";

export default defineComponent({
  name: "echars",
  props: ["option"],
  setup(props) {
    const box = ref(null);

    const { option } = toRefs(props);

    let myChart = null;
    onMounted(() => {
      myChart = echarts.init(box.value);
      myChart.setOption(option.value);
    });

    watch(option, (val) => {
      myChart.setOption(val);
    });
    return {
      box,
      myChart,
    };
  },
});
</script>

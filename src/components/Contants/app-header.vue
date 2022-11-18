<template>
  <div class="app-header">
    <div class="tohome" @click="tohome">首页</div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "app-header",
  setup() {
    const router = useRouter();
    const tohome = () => {
      router.push("/home");
    };
    return {
        tohome
    }
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
  .tohome {
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    color: yellowgreen;
  }
}
</style>
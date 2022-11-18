<template>
  <div class="home">
    <div
      class="nav"
      v-for="val in list"
      :key="val.name"
      @click="toDetail(val.name)"
    >
      {{ val.displayName }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { list } from "./content";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "home",
  setup() {
    const router = useRouter();

    //页面跳转
    const toDetail = (name) => {
      router.push({ name });
    };

    return {
      list,
      toDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .nav {
    width: 200px;
    height: 200px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-size: 24px;
    cursor: pointer;
    color: purple;
    &:hover {
      transition: 0.5s;
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 36px;
      text-shadow: 1px 1px rgba(197, 223, 248, 0.8),
        2px 2px rgba(197, 223, 248, 0.8), 3px 3px rgba(197, 223, 248, 0.8),
        4px 4px rgba(197, 223, 248, 0.8), 5px 5px rgba(197, 223, 248, 0.8),
        6px 6px rgba(197, 223, 248, 0.8);
    }
  }
}
</style>
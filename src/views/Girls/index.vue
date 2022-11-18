<template>
  <div class="girls">
    <div class="img">
      <li v-for="val in girlsList" :key="val.imageFileLength">
        <img :src="val.imageUrl" alt="" />
      </li>
    </div>
    <div class="more" @click="toMore">加载更多</div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import { imgRandom, test21 } from "../../api";

export default defineComponent({
  name: "girls",
  setup() {
    const state = reactive({
      girlsList: [],
    });

    //获取数据
    const getlist = async () => {
      const { data } = await imgRandom();
      await test21({ page: 1, perpage: 10 });
      state.girlsList.push(...data);
    };
    // 加载更多
    const toMore = () => {
      getlist();
    };

    onMounted(() => {
      getlist();
    });

    return {
      ...toRefs(state),
      toMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.girls {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: 1300px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 600px;
      margin: 5px;
      img {
        width: 100%;
      }
    }
  }

  .more {
    width: 200px;
    cursor: pointer;
    padding: 10px;
    background-color: salmon;
    margin-bottom: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
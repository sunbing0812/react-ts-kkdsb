<template>
  <div class="newsDetaile" v-if="!show">
    <div class="title">
      {{ list.title }}
    </div>
    <p> {{ list.ptime }}</p>
    <div class="content" v-html="list.content"></div>
    <ul class="img">
      <li v-for="val in list.images" :key="val.position">
        <img :src="val.imgSrc" alt="" />
      </li>
    </ul>
  </div>
  <div class="newsDetaile" v-else-if="show">暂无内容</div>
</template>

<script>
import { defineComponent, onMounted, reactive,toRefs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { newsDetails } from "../../api";

export default defineComponent({
  name: "newsDetaile",
  setup() {
    const { params } = useRoute();

    const state = reactive({
      list: [],
      show: false,
    });

    //详情数据
    const getDetail = async () => {
      const { data, code } = await newsDetails({ newsId: params.id });
      state.list = data;
      if (code == 0) {
        state.show = true;
      } else {
        state.show = false;
      }
    };
    onMounted(() => {
      getDetail();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.newsDetaile {
  padding: 20px;
  .title {
    font-weight: 800;
    font-size: 30px;
  }
  .img {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 400px;
      margin: 0 5px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
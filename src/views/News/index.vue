<template>
  <div class="news">
    <ul class="title">
      <li
        v-for="val in typeList"
        :key="val.typeId"
        :class="typeId == val.typeId ? 'active' : ''"
        @click="changeTitle(val.typeId)"
      >
        {{ val.typeName }}
      </li>
    </ul>
    <ul>
      <li
        v-for="val in newsList"
        :key="val.title"
        class="newList"
        @click="toDetail(val.newsId)"
      >
        {{ val.title }}
      </li>
    </ul>
    <ul class="changePage">
      <li @click="sub">上一页</li>
      <li @click="add">下一页</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, watch,toRefs } from "@vue/runtime-core";
import { newsType, newsList } from "../../api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "news",
  setup() {
    const state = reactive({
      typeList: [],
      typeId: "",
      newsList: [],
      page: 1,
    });

    const router = useRouter();

    onMounted(() => {
      getNewsType();
    });

    //获取新闻类型
    const getNewsType = async () => {
      const { data } = await newsType();
      state.typeList = data;
      state.typeId = data[0].typeId;
      getNewsList({ typeId: state.typeId, page: 1 });
    };

    const getNewsList = async (payload) => {
      const { data } = await newsList(payload);
      state.newsList = data;
    };

    const changeTitle = (typeId) => {
      state.typeId = typeId;
      state.page = 1;
      getNewsList({ typeId, page: 1 });
    };

    const toDetail = (newsId) => {
      if (newsId === "此类型无详情id") {
        ElMessage("暂无内容查看");
      } else {
        router.push({ name: "newsDetail", params: { id: newsId } });
      }
    };

    //下一页
    const add = () => {
      state.page++;
    };

    //上一页
    const sub = () => {
      if (state.page > 1) {
        state.page--;
      } else {
        ElMessage({
          message: "当前为第一页",
          duration: 500,
        });
      }
    };

    watch(
      () => state.page,
      (val) => {
        getNewsList({ typeId: state.typeId, page: val });
      }
    );

    return {
      ...toRefs(state),
      changeTitle,
      toDetail,
      add,
      sub,
      getNewsType,
    };
  },
  beforeRouteEnter(to, from) {
    if (from.path === "/home" && !!this) this.getNewsType();
  },
});
</script>

<style lang="scss" scoped>
.news {
  ul {
    width: 800px;
    margin: 0 auto;
  }
  .title {
    display: flex;
    background-color: pink;
    li {
      padding: 5px 10px;
      cursor: pointer;
      &.active {
        color: tomato;
      }
    }
  }
  .newList {
    cursor: pointer;
    padding: 5px 10px;
    background-color: plum;
    &:hover {
      color: tomato;
    }
  }
  .changePage {
    display: flex;
    justify-content: end;
    background-color: plum;
    padding-bottom: 10px;
    li {
      padding: 0 5px;
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        color: tomato;
      }
    }
  }
}
</style>
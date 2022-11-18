<template>
  <div class="recommend">
    <div class="title">笑话</div>
    <div class="jokes">
      <el-table
        ref="table"
        :data="List.list"
        style="width: 100%"
        border
        max-height="600"
      >
        <el-table-column prop="content" label="内容" align="center" />
        <el-table-column
          prop="updateTime"
          label="发布时间"
          align="center"
          width="200"
        />
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="List.totalCount"
        @currentChange="test"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "@vue/runtime-core";
import { jokesList } from "../../api";

export default defineComponent({
  name: "recommend",
  setup() {
    const state = reactive({
      List: [],
    });
    const table = ref(null);

    //数据
    const getJokesWord = async (page) => {
      const { data } = await jokesList({ page });
      state.List = data;
      table.value.context.refs.bodyWrapper.scrollTop = 0;
    };
    getJokesWord(1);

    const test = (e) => {
      getJokesWord(e);
    };

    return {
      ...toRefs(state),
      table,
      test,
    };
  },
});
</script>

<style lang="scss" scoped>
.recommend {
  width: 600px;
  padding: 20px;
  background-color: #fff;
  margin: 0 auto;
  .title {
    font-size: 30px;
    font-weight: 800;
  }
  .jokes {
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>
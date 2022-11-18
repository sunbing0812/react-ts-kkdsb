<template>
  <div class="refuse">
    <div style="margin-top: 15px">
      <el-input
        v-model="data"
        placeholder="请输入垃圾名查询"
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="query"></el-button>
        </template>
      </el-input>
    </div>
    <div class="result" v-show="show">
      <div>
        <p class="title">查询结果</p>
        <p>
          {{
            list.aim
              ? `${list.aim.goodsName} : ${list.aim.goodsType}`
              : "无结果"
          }}
        </p>
      </div>
      <div>
        <p class="title">相关内容</p>
        <ul>
          <li v-for="val in list.recommendList" :key="val.goodsName">
            {{ val.goodsName }} : {{ val.goodsType }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive,toRefs } from "@vue/runtime-core";
import { rubbish } from "../../api";
import { Search } from "@element-plus/icons";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "refuse",
  setup() {
    const state = reactive({
      data: "",
      list: {},
      show: false,
    });

    const getData = async (name) => {
      const { data, code, msg } = await rubbish({ name });
      if (code == 0) {
        ElMessage.error(msg);
        state.show = false;
      } else {
        state.list = data;
        state.show = true;
      }
    };

    const query = () => {
      getData(state.data);
      //   state.data = "";
    };

    return {
      ...toRefs(state),
      query,
      Search,
    };
  },
});
</script>

<style lang="scss" scoped>
.refuse {
  width: 600px;
  margin: 0 auto;
  .result {
    margin-top: 20px;
    .title {
      font-size: 28px;
      margin: 10px 0;
    }
  }
}
</style>
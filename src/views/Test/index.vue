<template>
  <div class="todolist">
    <Add @add="add" />
    <List :list="filterData" :selected="selected" @finish="finish" />
    <Selected :selected="selected" @changeSelected="changeSelected" />
    <div class="vuex">
      <button @click="btnAction">vuex</button>
      <p>{{ msg }}</p>
      <p>{{ leng }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "@vue/runtime-core";
import Add from "./components/add.vue";
import List from "./components/list.vue";
import Selected from "./components/select.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "test",
  components: {
    Add,
    List,
    Selected,
  },
  setup() {
    // 获得仓库对象
    const store = useStore(); //this.$store
    // const message = store.state.message;//这样获得的message只是一个普通的数据
    // 将message数据取出，并且拥有响应式，解决方法如下两种都可以
    // const { message } = toRefs(store.state);
    const msg = computed(() => store.state.message);
    // console.log(message);
    // console.log(msg);

    // getters
    // 将length数据取出，并且拥有响应式，解决方法如下两种都可以
    // const { length } = toRefs(store.getters);
    const leng = computed(() => store.getters.length);
    // console.log(length.value);
    // console.log(leng.value);

    const btnAction = () => {
      // 调用mutations
      // store.commit('modifyMessage', 'test');

      // 调用actions
      store.dispatch("testAction", "hello");
    };

    const list = reactive([]);
    const selected = ref("all");

    //增加
    const add = (e) => {
      list.push({
        event: e,
        state: "todo",
        id: new Date().getTime(),
      });
    };

    //完成
    const finish = (e) => {
      const data = list.find((val) => val.id === e.id);
      data.state = "finish";
    };

    //数据过滤

    const filterData = computed(() => {
      return selected.value === "all"
        ? list
        : list.filter((val) => val.state === selected.value);
    });

    const changeSelected = (e) => {
      selected.value = e;
    };

    const ruleForm = reactive({
      username: "",
      password: "",
    });

    return {
      list,
      add,
      finish,
      selected,
      changeSelected,
      filterData,
      btnAction,
      leng,
      msg,
      ruleForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.vuex {
  padding-left: 10px;
}
</style>
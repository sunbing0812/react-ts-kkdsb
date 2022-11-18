<template>
  <div class="weather">
    <div class="top">
      <div class="select">
        省：<el-select v-model="province" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select">
        市：
        <el-select v-model="selectCity" placeholder="请选择">
          <el-option
            v-for="item in city"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select">
        区：
        <el-select v-model="selectArea" placeholder="请选择">
          <el-option
            v-for="item in area"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="query" @click="query">查询</div>
    </div>
    <div class="content">
      <Echars :option="option" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, watch,toRefs } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { cityList, weather } from "../../api";
import Echars from "../../components/Echars";

export default defineComponent({
  name: "weather",
  components: {
    Echars,
  },
  setup() {
    const state = reactive({
      list: [], //全国城市列表
      province: "",
      city: [], //市区
      selectCity: "",
      area: [], // 区域
      selectArea: "",
      forecasts: {
        date: [],
        Lowest: [],
        Highest: [],
        address: "",
      },
      option: {},
    });

    //获取城市列表
    const getCityList = async () => {
      const { data } = await cityList();
      state.list = data;
    };

    //获取天气信息
    const getWeather = async (city) => {
      const { data, code, msg } = await weather(city);

      if (code == 0) {
        ElMessage.error(msg);
      } else {
        filtersDate(data.forecasts, data.address);
        setOption(state.forecasts);
      }
    };

    //配置项
    const setOption = (forecasts) => {
      state.option = {
        title: {
          text: forecasts.address,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: forecasts.date,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C",
          },
        },
        series: [
          {
            name: "白天平均气温",
            type: "line",
            data: forecasts.Highest,
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "Avg",
                },
              ],
            },
          },
          {
            name: "夜晚平均气温",
            type: "line",
            data: forecasts.Lowest,
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "Avg",
                },
              ],
            },
          },
        ],
      };
    };

    onMounted(() => {
      getCityList();
    });

    //监听省变化
    watch(
      () => state.province,
      (val) => {
        state.city = [];
        state.selectCity = "";
        const { pchilds } = state.list.find((one) => one.name === val) || {
          pchilds: [],
        };
        state.city = pchilds;
      }
    );

    // //监听市变化
    watch(
      () => state.selectCity,
      (val) => {
        state.area = [];
        state.selectArea = "";
        const { cchilds } = state.city.find((one) => one.name === val) || {
          cchilds: [],
        };
        state.area = cchilds;
      }
    );

    //数据过滤
    const filtersDate = (data, address) => {
      if (data) {
        state.forecasts = {
          date: [],
          Lowest: [],
          Highest: [],
          address: "",
        };
        state.forecasts.address = address;
        data.map((val) => {
          state.forecasts.date.push(val.date.replace(/-/g, "/"));
          state.forecasts.Lowest.push(parseInt(val.nightTemp));
          state.forecasts.Highest.push(parseInt(val.dayTemp));
        });
      }
    };

    //查询
    const query = () => {
      if (state.selectArea !== "" && state.selectArea !== "市辖区") {
        getWeather(state.selectArea);
      } else if (state.selectCity !== "" && state.selectCity !== "市辖区") {
        getWeather(state.selectCity);
      } else if (state.province !== "") {
        getWeather(state.province);
      } else {
        ElMessage.error("请选择城市");
      }
    };

    return {
      ...toRefs(state),
      query,
    };
  },
});
</script>

<style lang="scss" scoped>
.weather {
  .top {
    display: flex;
    padding: 5px;
    justify-content: center;
    .select {
      margin: 0 10px;
    }
    .query {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: springgreen;
      padding: 0 10px;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
  .content {
    margin: 0 auto;
    padding: 20px;
    width: 800px;
    height: 600px;
  }
}
</style>
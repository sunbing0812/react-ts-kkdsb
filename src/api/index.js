import axios from "./axios";

//指定日期的节假日及万年历信息
// date 日期 格式 yyyyMMdd
export const holiday = data => axios.get1(`/api/holiday/single/${data}`);

// 获取全国城市列表信息
export const cityList = () => axios.get1('/api/address/list');

//获取特定城市未来天气信息
export const weather = data => axios.get1(`/api/weather/forecast/${data}`)

//分页获取笑话段子列表
//page： 页数
//limit： 每页数量
export const jokesList = data => axios.get1('/api/jokes/list', data);

//每日分享的精美语句
export const dailyWord = () => axios.get1('/api/daily_word/recommend', {
    count: 20
})

//每日最新新闻类型
export const newsType = () => axios.get1('/api/news/types');
//获取所有新闻类型列表
/* 
typeId ：类型id
page :页数
*/
export const newsList = data => axios.get1('/api/news/list',data);

//新闻详情   newsId
export const newsDetails = data => axios.get1('/api/news/details',data);

// 随机图片验证码
export const imgCode = () => axios.get1('/api/verifycode/code');

//历史上的今天
export const historyToday = () => axios.get1('/api/history/today');

//随机美女图片
export const imgRandom = () => axios.get1('/api/image/girl/list/random');

//垃圾分类查询
//name :物品名
export const rubbish= data => axios.get1('/api/rubbish/type', data);



export const test21= data => axios.get2('/myapi/api/App/Table/FreeQuery', {...data,model_name:'datedemo',is_real_total:1,});

import axios from 'axios'
import {ElMessage} from 'element-plus'

// 对axios二次封装：

class Axios {
  // 实例属性：axios的实例对象
  axiosInstance = null;

  // 构造函数
  constructor() {
    // 创建axios的实例对象
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_AXIOS_BASE_URL
      // baseURL: ''

    });
    // 调用添加拦截器
    this.addRequestInterceptor();//请求拦截器
    this.addResponseInterceptor();//响应拦截器
  }

  // 添加请求拦截器
  addRequestInterceptor() {
    this.axiosInstance.interceptors.request.use((config) => {
      // const token = localStorage.getItem('TOKEN');
      // token && (config.headers.common['Authorization'] = `Bear ${token}`);
      return config;
    })
  }

  // 添加响应拦截器。当得到服务端的响应后，先拦截下来进行错误统一处理。
  addResponseInterceptor() {
    this.axiosInstance.interceptors.response.use((response) => {
      // 判断请求的状态码是否成功
      if (response.status >= 200 && response.status < 300) {
        // 成功只响应data
        return response.data;
      } else {
        // 不成功
        return Promise.reject(response.data.message);
      }
    }, (error) => {
      console.log(error);
      // 请求失败
      const status = error.response.status;
      ElMessage.error(error.response.data.msg);//错误提示
      switch (status) {
        case 401:
          //登录失效了，重新登录
          // localStorage.removeItem('TOKEN');
          // router.replace({ name: 'login' });
          break;
        default:
          break;
      }
      return Promise.reject(error.response.data.message);
    });
  }

  // get方法的封装：结果为promise对象
  get1(url, data = {}) {
    return this.axiosInstance.get(url, { params:{
      app_id: "jlgnxhfiinvhv8kq",
      app_secret: "ZkQ2UHRnY1lqSldxTEptTW4rQ252UT09",
       ...data 
    }
     });
  }
  get2(url, data = {}) {
    return this.axiosInstance.get(url, { params:{
      app_key:'3EA70972243B12F11358E50313B5E1EC',
      sign:'F3EFB46F40B81ED876F083E32859B6E1',
       ...data 
    }
     });
  }

  // post方法的封装：结果为promise对象
  post(url, data = {}) {
    return this.axiosInstance.post(url, data);
  }

  // put方法的封装：结果为promise对象
  put(url, data = {}) {
    return this.axiosInstance.post(url, data);
  }

  // put方法的封装：结果为promise对象
  patch(url, data = {}) {
    return this.axiosInstance.post(url, data);
  }

  // put方法的封装：结果为promise对象
  delete(url, data = {}) {
    return this.axiosInstance.get(url, { params: data });
  }

}

const appAxios = new Axios();
export default appAxios;

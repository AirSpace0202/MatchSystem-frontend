import axios, { AxiosInstance } from 'axios';

// 创建一个 axios 实例并设置了基础地址，后续只需要进行地址拼接即可
const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8090/api'            // 当前请求地址
})

myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("发起请求")
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("响应请求" + response.data.code);
    // 未登录跳转至登录页
    if (response?.data?.code === 50000) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
import axios from 'axios';

// 配置请求项
const request = axios.create({
    baseURL: "http://192.168.0.104:8010",
    // baseURL: "http://101.42.41.134:8010/uniboke",
    timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(config => {
    // 成功时执行
    return config;
},
    err => {
        // 失败时执行
        return Promise.reject(err)
    })

// 响应拦截器
request.interceptors.response.use(result => {
    return result.data;
}, err => {
    return Promise.reject(err);
})

export default request;
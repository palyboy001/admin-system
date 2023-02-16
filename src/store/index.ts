import { defineStore } from 'pinia'
import { RouterArray,AuthorInfo,Router_interface,SystemValue } from "@/types/interfaces"

interface StateInterface{

}

// 定义store容器
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
    // 定义state:state: () => ({text:"222"})
    // 必须是函数：为了在服务端渲染的时候避免交叉请求导致数据状态污染
    // 必须为箭头函数，为了能够更好的TS类型推导
    state: () => {
        return {
            userInfo: {} as AuthorInfo, // 用户信息
            router: false, // 路由是否挂载上去了 
            routes: {}, // 路由信息
            systemValue: {
                width:"",
                height:""
            }, // 系统信息
            contentValue:{
                width:"",
                height:""
            },// 内容的宽高
        }
    },

    // 定义getter，计算属性
    getters: {
        // 定义计算属性方法
        // 可以用this访问state中的值，但是会有返回值类型未定义问题，需要指定返回值类型，使用state他会自己推导出返回值的类型
    },

    // 定义方法
    actions: {
        // 直接通过this可以获取到state中的值
        chageRouter(value: boolean) {
            this.router = value;
        },

        // 保存路由信息
        chageRoutes(value:Array<Router_interface>) {
            this.routes = value
        },

        // 修改用户信息
        chageUserInfo(value:AuthorInfo){
            this.userInfo = value;
        },

        // 修改系统信息
        chageSystemInfo(value:SystemValue){
            this.systemValue = value
        }
    }
})
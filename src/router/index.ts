// 引入路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Router_interface, RouterArray, AuthorInfo } from '../types/interfaces'
import { getRoutes } from '@/request/api'
import { useUserStore } from "@/store"
// import.meta.glob(需要导入组件的路径)
const modules = import.meta.glob('@/pages/**/*.vue')  // vite导入模块指引 


const routes: RouteRecordRaw[] = [
    {
        "path": "/",
        "name": "Home",
        "redirect": "/index"
    },
    {
        "path": "/login",
        "name": "Login",
        "component": () => import("../pages/login/login.vue")
    },
    {
        path: "/index",
        name: "index",
        component: () => import("../pages/index/index.vue")
    },
    {
        path: "/test",
        name: "test",
        component: () => import("../pages/text/test.vue")
    },
    {
        path: "/none",
        name: "none",
        component: () => import("../pages/none/none.vue")
    }

]

// 创建路由组件
const router = createRouter({
    history: createWebHistory(),
    routes // 路由信息
})



// 路由守卫i，跳转前
router.beforeEach(async (to, from, next) => {
    // 获取store中的值
    let userStore = useUserStore()
    // 解构用户信息
    let userInfo: AuthorInfo = userStore.userInfo as AuthorInfo

    // 到达login终止跳转
    if (to.name === 'Login') {
        console.log("进入login");
        next()
        return false
    }

    // token不存在则跳到登录页
    if (userInfo.user.password === ""){
        console.log("token为空");
        next("/login")
        return false
    }

    if(to.name === 'index'){
        console.log("前往首页",from.name);
        if(from.name === 'sendTopic'){
            next({name:"none"})
            return false;
        }
        next({name:"sendTopic",params: { parent:"/topic", child:"sendTopic" }})
        return false
    }

    // 如果动态路由还没渲染上路由，每次跳转新页面，路由会消失
    // 则重新添加
    if (!userStore.router) {
        console.log("重新进入路由");
        // userInfo.user.userRole
        await getRoutes({ power: "administer" }).then(res => {
            console.log("路由重新请求成功", res);
            // 格式化路由
            let arr_ = formmtinoMeta(res.data)
            userStore.chageRoutes(arr_ as Array<Router_interface>)
            userStore.chageRouter(true)
        }).catch(err => {
            console.log("请求失败catch", err);
            userStore.chageRouter(false);
            userStore.chageRoutes([])
        })
        next({ ...to })
        console.log("路由加载成功");
        // 挂载成功后修改状态
        userStore.chageRouter(true)
    } else {
        next()
        // return { name: "Login" }
    }
})

// 动态添加路由
export const addRouter = function (num: Array<Router_interface>) {
    num.forEach((item) => {
        let component = item.component;
        // 导入组件
        item.component = modules[`/src/pages/${item.component}/${item.component}.vue`]
        if (item.children) {
            // 循环子路由
            item.children.forEach((item_children,index:number) => {
                item.children[index].component = modules[`/src/pages/${component}/children/${item_children.component}.vue`]
            })
        }
        router.addRoute(item)
    })
}

// 格式化路由信息的meta，返回路由数组
export const formmtinoMeta = (arr: Array<any>): RouterArray => {    
    let arr_ = arr.map(item => {
        item.meta = JSON.parse(item.meta)
        // children
        if (item.children) {
            item.children.map((item_child: any, index: number) => {
                item.children[index].meta = JSON.parse(item_child.meta)
            })
        }

        return item as Router_interface;
    })
    return arr_ as RouterArray;

}

// 导出路由
export default router
<template>
    <div class="container flex">
        <!-- 导航栏悬浮球 -->
        <!-- <div class="nav-position flex center" ref="nav_ball">
            <el-icon size="20" color="#FFFFFF">
                <Operation />
            </el-icon>
        </div> -->
        <div class="content-body flex column">
            <!-- 头部 -->
            <div class="banner flex">
                <router-link class="flex flex-1" to="/index">
                    <img class="logo" src="/src/assets/vue.svg" />
                    <span class="title">风语阁后台管理系统</span>
                </router-link>
                <div class="userInfo flex row">
                    <div class="title">
                        <span class="text">{{ userStore.userInfo.user.userRole }}</span>
                    </div>
                    <div class="image flex center">
                        <img class="img" :src="userStore.userInfo.user.infoImage" />

                    </div>
                    <el-button type="primary" @click="exit">退出</el-button>
                </div>
            </div>
            <div class="content flex row" :style="{ 'height': height }">
                <navs v-if="showNav" @hideNav="showNav = false" @style_="getStyle"></navs>
                <div class="subject">
                    <router-view ref="chidren"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import navs from '@/components/nav.vue'
import { useUserStore } from '@/store';
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, onBeforeMount } from 'vue'
import { RouterView } from 'vue-router';
import type { Action } from 'element-plus'
import router from '@/router';

// store中的值
let userStore = useUserStore()
// 是否展示nav导航栏
let showNav = ref(true)

// 鼠标移到导航栏悬停区域
// 获取球的元素
// let nav_ball = ref()

// 获取内容的高度
let height = ref("")

// 获取nav的dom
const getStyle = function (value: HTMLElement) {
    // 设置内容的宽高
    userStore.contentValue.width = (window.innerWidth - value.clientWidth) + 'px'
    userStore.contentValue.height = (window.innerHeight - 110) + 'px'
}
// 渲染前
onBeforeMount(() => {
    console.log("进入主页");
    // 设置content的高度
    height.value = (window.innerHeight - 100) + 'px'
})


// 点击退出登录
const exit = () => {
    ElMessageBox.alert('是否退出登录', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
            if (action === 'confirm') {
                exitLogin()
            }
        },
    })
}

// 退出登录
const exitLogin = () => {
    ElMessage({
        type: 'success',
        message: "退出成功！",
    })

    // 清除前端token
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // 跳转页面
    router.push('/login');
}



</script>
<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: white;

    // 悬浮小球导航栏区域
    .nav-position {
        cursor: pointer;
        position: absolute;
        width: 50px;
        height: 50px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #545C64;
        top: 50px;
        left: 0;
        z-index: 0;
    }

    // 内容区域
    .content-body {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .banner {
            // width: 100%;
            align-items: center;
            height: 100px;
            background-color: #545C64;
            padding-left: 50px;
            box-sizing: border-box;
            // border-bottom: 1px solid rgba(129, 129, 129, 0.288);

            .logo {
                margin: 0 10px;
            }

            .title {
                font-size: 30px;
                font-family: "楷体";
                font-weight: bold;
                color: white;
            }
        }

        .userInfo {
            width: 300px;
            align-items: center;

            .image {
                width: 60px;
                height: 60px;
                position: relative;
                padding: 20px;

                .img {
                    width: 60px;
                    height: 60px;
                    // 等比例修剪
                    object-fit: cover;
                    border-radius: 100%;
                }

            }

            .title {
                font-size: 20px;
            }
        }

        .content {
            width: 100%;
            box-sizing: border-box;

            .subject {
                position: relative;
                box-sizing: content-box;
                padding: 0 5px;
                height: 600px;
            }

        }


    }

}

// 下拉菜单
// @keyframes pull_down {
//     0%{

//     }
// }
</style>

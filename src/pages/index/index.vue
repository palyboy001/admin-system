<template>
    <div class="container flex">
        <!-- 导航栏悬浮球 -->
        <div class="nav-position flex center" ref="nav_ball">
            <el-icon size="20" color="#FFFFFF">
                <Operation />
            </el-icon>
        </div>
        <navs v-if="showNav" @hideNav="showNav = false"></navs>
        <div class="content-body flex column">
            <!-- 头部 -->
            <div class="banner flex">
                <img class="logo" src="../../assets/vue.svg" />
                <span class="title">风语阁后台管理系统</span>
            </div>
            <div class="content" :style="{ 'height': height }">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import navs from '@/components/nav.vue'
import { useUserStore } from '@/store';

import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterView } from 'vue-router';

// 是否展示nav导航栏
let showNav = ref(false)

// 鼠标移到导航栏悬停区域
// 获取球的元素
let nav_ball = ref()

// 获取内容的高度
let height = ref("")


// 渲染前
onBeforeMount(() => {
    console.log("进入主页");
    // 设置content的高度
    height.value = (window.innerHeight - 100) + 'px'

})

// store中的值
let userStore = useUserStore()

// 渲染后
onMounted(() => {
    // 添加移入按钮，展示导航栏
    nav_ball.value.addEventListener("click", function (event: unknown) {
        // console.log(event);
        showNav.value = true
    })


})





</script>
<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
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
    }

    // 内容区域
    .content-body {
        width: 100%;
        height: 100%;

        .banner {
            // width: 100%;
            align-items: center;
            height: 100px;
            // background-color: red;
            padding-left: 50px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(129, 129, 129, 0.288);

            .logo {
                margin: 0 10px;
            }

            .title {
                font-size: 30px;
                font-family: "楷体";
                font-weight: bold;
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

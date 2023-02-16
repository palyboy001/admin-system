<template>
    <!-- 使用后台返回的权限控制展示按钮 -->
    <!-- 使用自定义指令控制 -->
    <div class="btns">
        <button v-has-show="'shop:create'">新增</button>
        <button v-has-show="'shop:edit'">编辑</button>
        <button v-has-show="'shop:delete'">删除</button>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import type { Directive } from 'vue'
// 用户id
localStorage.setItem("userID", '111');

// 模拟后台返回的权限数组
const permission = [
    // "用户id:当前页面:当前权限"
    "111:shop:edit",
    "111:shop:delete",
    "111:shop:create"
]

const userID = localStorage.getItem("userID");
// 创建自定以指令 
// 使用大小写的方式区分开 v-has-show   ---->  vHasShow
// Directive<HTMLElement,string> 表示第一个参数的类型为HTMLElement，第二个参数类型为字符串
// el：表示当前指令绑定的元素    bingding：表示绑定的值，指令传过来的值
const vHasShow: Directive<HTMLElement, string> = (el, bingding) => {
    console.log(el,bingding);
    
    // 如果权限数组中不包含则yinc
    if (!permission.includes(userID + ':' + bingding.value)) {
        el.style.display = "none"
    }
}

</script>
<style lang='less' scoped>
.btns {
    button {
        margin: 10px;
    }
}
</style>

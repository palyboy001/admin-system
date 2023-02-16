<template>
    <div class="container_ flex">
        <div class="content flex row">
            <div class="leftImage">
                <el-avatar :size="60" @error="errorHandler">
                    <img :src="user.infoImage" />
                </el-avatar>
            </div>
            <div class="rightContent">
                <div class="item account">
                    <span class="itemTitle">uid：</span>
                    <span class="itemContent">{{ user.userAccount }}</span>
                </div>
                <div class="item nikeName">
                    <span class="itemTitle">昵称：</span>
                    <span class="itemContent">{{ user.nikeName }}</span>
                </div>
                <div class="item level">
                    <span class="itemTitle">等级：</span>
                    <span class="itemContent">lv.{{ user.level }}</span>
                </div>
                <div class="item address">
                    <span class="itemTitle">地址：</span>
                    <span class="itemContent">{{ user.address }}</span>
                </div>
                <div class="item age">
                    <span class="itemTitle">年龄：</span>
                    <span class="itemContent">{{ age }}</span>
                </div>
                <div class="item email">
                    <span class="itemTitle flex-1">用户邮箱：</span>
                    <span class="itemContent">{{ user.email }}</span>
                </div>
                <div class="item signature">
                    <span class="itemTitle">个性签名：</span>
                    <span class="itemContent">{{ user.signature }}</span>
                </div>
                <div class="item lastLoginTime">
                    <span class="itemTitle">上一次登录时间：</span>
                    <span class="itemContent">{{ user.lastLoginTime }}</span>
                </div>
                <div class="item delFlag">
                    <span class="itemTitle">是否注销：</span>
                    <span class="itemContent" style="color:#129238;" v-if="user.delFlag === '1'">未注销</span>
                    <span class="itemContent" style="color:red;font-weight:bold" v-else>已注销</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref,computed } from 'vue'
const porps = defineProps({
    user:{
        type:Object,
        default:{}
    }
})

// 当图片加载失败
const errorHandler = () => true

// 计算年龄
const age = computed(() =>{
    return 10;
})

</script>
<style lang='less' scoped>
.container_ {
    width: 350px;
    border: 1px #3abead solid;
    background-color: #76f3fc;
    .content {
        padding: 10px;
        .leftImage {
            padding-right: 20px;
        }
        .rightContent {
            .item {
                padding-bottom: 3px;
                .itemTitle {
                    font-size: 17px;
                    color: #000000;
                }
                .itemContent {
                    font-size: 16px;
                    color: #727272;
                }
            }
        }
    }
}
</style>

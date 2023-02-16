<template>
    <div class="container">
        <div class="title">
            <div class="text">{{ cardTitle }}:</div>
        </div>
        <div class="content flex row">
            <div class="leftImage">
                <el-avatar :size="60" @error="errorHandler">
                    <img :src="user.infoImage" />
                </el-avatar>
            </div>
            <div class="rightContent">
                <div class="item account">
                    <span class="itemTitle">uid：</span>
                    <span class="itemContent">{{ user.account }}</span>
                </div>
                <div class="item nikeName">
                    <span class="itemTitle">昵称：</span>
                    <span class="itemContent">{{ user.nikeName }}</span>
                </div>
                <div class="item age">
                    <span class="itemTitle">地址：</span>
                    <span class="itemContent">{{ user.address }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
const porps = defineProps({
    cardTitle: {
        type: String,
        default: "举报人"
    },
    user: {
        type: Object,
        default:{}
    }
})

// 图片加载失败时
const errorHandler = () => true;

</script>
<style lang='less' scoped>
.container {
    background-color: aquamarine;

    // 标题
    .title {
        padding: 10px;
    }

    // 内容
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

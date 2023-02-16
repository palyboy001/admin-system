<template>
    <div class="container flex row">
        <div class="userImage flex center">
            <img :src="topic.userRole.infoImage" />
        </div>
        <div class="userInfo flex column">
            <div class="title">昵称：{{ topic.userRole.nikeName }}</div>
            <div class="id">校园号：{{ topic.userRole.userAccount }}</div>
        </div>
        <div class="topicAttribute flex column">
            <div class="time">
                <span class="AttrTitle">发布时间：</span>
                <span class="AttrContent">{{ topic.topicCreateTime }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">获赞：</span>
                <span class="AttrContent">{{ topic.like_count }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">阅读量：</span>
                <span class="AttrContent">{{ topic.read_count }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">收藏量：</span>
                <span class="AttrContent">{{ topic.collect_count }}</span>
            </div>
        </div>
        <div class="topicContent flex-1">
            <span class="text">{{ topic.content }}</span>
        </div>
        <div class="topicImage">
            <div class="imageMask flex center" v-if="topic.topicImage.length > 1">
                <span>{{ `+${topic.topicImage.length}` }}</span>
            </div>
            <img :src="topic.topicImage[0]" v-if="topic.topicImage.length >= 1" />
        </div>
        <div class="edit flex">
            <button class="delete" @click="btn('delete')">删除</button>
            <button @click="btn('ban')">封禁</button>
            <button @click="btn('limit')">限流</button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
// 定义props
const porps = defineProps({
    topic: {
        type: Object,
        default: ""
    },
    index:{
        type:Number,
        default:0
    }
})

// 定义按钮的固定类型
type Btn_type = 'delete' | 'ban' | 'limit' | never;

// 给父组件促发
const emit = defineEmits<{
    (event: 'delete',index:number): void,
    (event: 'ban',index:number): void,
    (event: 'limit',index:number): void,
}>()

// 按钮点击
const btn = (str:Btn_type):void =>{
    switch(str){
        case 'delete':
            emit(str,porps.index);
            break;
        case 'ban':
            emit(str,porps.index);
            break;
        case 'limit':
            emit(str,porps.index);
            break;
        default:
            console.log("按钮的类型错误");
            
    }
}
</script>
<style lang='less' scoped>
// 用户头像大小
@user_img_width: 60px;
@user_img_height: 60px;

// 话题图片大小
@imgae_height: 100px;
@imgae_width: 100px;

// 用户信息和图片前后竖线
.userImage::before,
.topicImage::before {
    content: "";
    width: 2px;
    height: 90%;
    background-color: rgb(115, 204, 255);
    position: absolute;
    right: 0;
    border-radius: 2px;
}

img {
    object-fit: cover;
    width: @imgae_height;
    height: @imgae_height;
}

.container:hover {
    cursor: pointer;
    background-color: #6ddaf55e;
}

.container {
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid rgb(115, 204, 255);

    // 头像
    .userImage {
        width: @user_img_width;
        height: @user_img_height;
        padding: 0 30px;
        position: relative;

        img {
            width: @user_img_width;
            height: @user_img_height;
            border-radius: 100%;
            border: 1px solid rgb(115, 204, 255);

        }
    }

    // 用户信息
    .userInfo {
        justify-content: center;
        padding: 0 30px;
        position: relative;
        height: 100px;

        .title {
            padding-bottom: 20px;
            font-size: 18px;
        }

        .id {
            font-size: 15px;
            color: #6e6e6e;
        }
    }

    // 话题属性
    .topicAttribute {
        margin-right: 30px;

        .AttrTitle {
            display: inline-block;
            width: 80px;
            text-align: right;
        }

        .AttrContent {
            color: #8181818c;
        }
    }

    // 话题内容
    .topicContent {
        padding: 5px;
        height: 100px;
        font-size: 17px;
        line-height: 26px;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    // 图片
    .topicImage {
        position: relative;
        padding-right: 20px;

        .imageMask {
            position: absolute;
            top: 0;
            left: 0;
            width: @imgae_width;
            height: @imgae_height;
            background-color: rgba(165, 165, 165, 0.6);
            color: #FFFFFF;
            font-size: 20px;
        }
    }

    // 按钮
    .edit {
        align-items: center;
        padding: 0 20px;

        button {
            width: 80px;
            height: 30px;
            box-sizing: border-box;
            margin: 5px;
            color: #FFFFFF;
            background-color: #62cbe6;
            border: 3px solid #5ab7ce;
            border-radius: 10px;
        }

        button[class="delete"] {
            background-color: red;
            border: 3px solid #da4a4a;
        }

        button:hover {
            background-color: #5ab7ce;
            border: 3px solid #62cbe6;
        }

        button[class="delete"]:hover {
            background-color: #da4a4a;
            border: 3px solid red;
        }
    }
}
</style>

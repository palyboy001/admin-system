<template>
    <div class="container flex row">
        <div class="userImage flex center">
            <img :src="message.source.infoImage" />
        </div>
        <div class="userInfo flex column">
            <div class="title">昵称：{{ message.source.nikeName }}</div>
            <div class="id">校园号：{{ message.source.userAccount }}</div>
        </div>
        <div class="topicAttribute flex column">
            <div class="time">
                <span class="AttrTitle">发布时间：</span>
                <span class="AttrContent">{{ message.createTime }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">接收方：</span>
                <span class="AttrContent">{{ message.destination }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">消息类型：</span>
                <span class="AttrContent">{{ message.type }}</span>
            </div>
        </div>
        <div class="topicContent flex-1">
            <span class="text">{{ message.message }}</span>
        </div>
        <div class="edit flex">
            <button class="delete">删除</button>
            <button>封禁</button>
            <button>禁止私聊</button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, computed} from 'vue'
import { timestamp_to_Date } from '@/javascript/public'
// 定义props
const porps = defineProps({
    message: {
        type: Object,
        default: ""
    }
})

// 格式化时间
const createTime = computed(() =>{
    return timestamp_to_Date(porps.message.user.createTime);
})

let content = ref("")
content.value = "sfs法撒洒发的萨芬萨生飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飞飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飞飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飞飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飒阿德撒法撒飞洒飞飞洒大飒飒阿德撒法撒飞洒飞洒范德萨发达撒飞洒飞洒发的萨芬萨生飞洒大飒飒阿德撒法撒飞洒飞洒范德萨发达撒飞洒飞洒发的萨芬萨生飞洒大飒飒阿德撒法撒飞洒飞洒范德萨发达撒飞洒飞洒发的萨芬萨生飞洒大飒飒阿德撒法撒飞洒飞洒范德萨发达撒飞洒飞洒发的萨芬萨生飞洒大飒飒阿德撒法撒飞洒飞洒范德萨发达撒飞洒大夫是否大师傅大师傅大师傅大师傅但是烦烦烦大师傅撒旦撒入发撒纷纷阿飞萨芬萨芬"

</script>
<style lang='less' scoped>
// 用户头像大小
@user_img_width: 60px;
@user_img_height: 60px;

// 话题图片大小
@imgae_height: 100px;
@imgae_width: 100px;

// 内容的总宽高
@content-height:100px;

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
    height: @content-height;
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
        padding: 15px;
        height: @content-height;
        box-sizing: border-box;
        font-size: 17px;
        line-height: 27px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
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

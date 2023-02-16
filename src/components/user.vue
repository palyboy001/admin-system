<template>
    <div class="container flex row">
        <div class="userImage flex center">
            <img :src="user.user.infoImage" />
        </div>
        <div class="userInfo flex column">
            <div class="title">昵称：{{ user.user.nikeName }}</div>
            <div class="id">校园号：{{ user.user.userAccount }}</div>
        </div>
        <div class="topicAttribute flex column">
            <div class="time">
                <span class="AttrTitle">创建时间：</span>
                <span class="AttrContent">{{ createTime }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">ip地址：</span>
                <span class="AttrContent">{{ user.user.address }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">性别：</span>
                <span class="AttrContent">{{ user.user.sex === '1'?'男':'女' }}</span>
            </div>
            <div class="zan">
                <span class="AttrTitle">是否注销：</span>
                <span class="AttrContent">{{ user.user.delFlag===1?'已注销':'未注销' }}</span>
            </div>
        </div>
        <div class="topicContent flex-1">
            <span class="text">{{ content }}</span>
        </div>
        <!-- <div class="topicImage">
            <div class="imageMask flex center" v-if="topic.topicImage.length > 1">
                <span>{{ `+${topic.topicImage.length}` }}</span>
            </div>
            <img :src="topic.topicImage[0]" v-if="topic.topicImage.length >= 1" />
        </div> -->
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
    user: {
        type: Object,
        default: ""
    }
})

// 格式化时间
const createTime = computed(() =>{
    return timestamp_to_Date(porps.user.user.createTime);
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

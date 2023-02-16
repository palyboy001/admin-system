<template>
    <div class="container flex row">
        <div class="itemBox reportInfo">
            <div class="item type">
                <span class="title">类型：</span>
                <span class="content">{{ reportMessage.sqlReportInfo.type }}</span>
            </div>
            <div class="item reportTime">
                <span class="title">举报时间：</span>
                <span class="content">{{ reportMessage.sqlReportInfo.createTimes }}</span>
            </div>
        </div>
        <div class="itemBox reportUser" @mouseenter="mouseenter_(true)" @mouseleave="mouseleave_(true)">
            <reportUser :cardTitle="'举报人'" :user="reportMessage.reportUser"></reportUser>
            <userCard :class="{ translation: r_mtion, userCard }" v-if="showReportUser"
                :user="reportMessage.reportUser"></userCard>
        </div>
        <div class="itemBox cheaters" @mouseenter="mouseenter_(false)" @mouseleave="mouseleave_(false)">
            <reportUser :cardTitle="'被举报人'" :user="reportMessage.reportUser"></reportUser>
            <userCard :class="{ translation: c_amtion, userCard }" v-if="showCheaters" :user="reportMessage.cheaters">
            </userCard>
        </div>
        <div class="itemBox reportContent flex-1">{{ reportMessage.sqlReportInfo.reportContent }}</div>
        <div class="itemBox reportImage" v-if="reportMessage.sqlReportInfo.images.length !== 0">
            <img class="img" :src="reportMessage.sqlReportInfo.images[0]" />
        </div>
        <div class="itemBox button">
            <button class="delete" @click="btn('delete')">删除</button>
            <button @click="btn('ban')">封禁</button>
            <button @click="btn('limit')">限流</button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import reportUser from './reportUser.vue';
import userCard from './userCard.vue';
import { ref, onMounted } from 'vue'

// 接收父组件的值
const porps = defineProps({
    reportMessage: {
        type: Object,
        default: {}
    },
    index:{
        type:Number,
        default:0
    }
})


// 给父组件促发
const emit = defineEmits<{
    (event: 'delete', index: number): void,
    (event: 'ban', index: number): void,
    (event: 'limit', index: number): void,
}>()

// 按钮点击
const btn = (str: string): void => {
    switch (str) {
        case 'delete':
            emit(str, porps.index);
            break;
        case 'ban':
            emit(str, porps.index);
            break;
        case 'limit':
            emit(str, porps.index);
            break;
        default:
            console.log("按钮的类型错误");
    }
}

// 展示举报个人信息
const showReportUser = ref(false);
// 动画
const r_mtion = ref(false);

// 展示被举报个人信息
const showCheaters = ref(false);
// 动画
const c_amtion = ref(false);

// 添加鼠标移入事件,who:true表示举报者
const mouseenter_ = (who: boolean) => {
    if (who) {
        showReportUser.value = true;
        setTimeout(() => {
            r_mtion.value = true;
        }, 10)
    } else {
        showCheaters.value = true;
        setTimeout(() => {
            c_amtion.value = true;
        }, 10)
    }
}
// 鼠标移出事件 
const mouseleave_ = (who: boolean) => {
    if (who) {
        showReportUser.value = false;
        setTimeout(() => {
            r_mtion.value = false;
        }, 10)
    } else {
        showCheaters.value = false;
        setTimeout(() => {
            c_amtion.value = false;
        }, 10)
    }
}


</script>
<style lang='less' scoped>
@content_height: 150px;

.translation {
    opacity: 1 !important;
    transform: translateY(0px) !important;
}

.container {
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid rgb(115, 204, 255);
    height: @content_height;
    margin: 10px 0;

    .reportInfo {
        width: 260px;
    }

    .itemBox {
        position: relative;

        .item {
            padding: 10px;

            .title {
                display: inline-block;
                text-align: right;
                width: 6rem;
            }
        }

        .userCard {
            position: absolute;
            top: 50px;
            left: 0;
            z-index: 10;
            opacity: 0;
            transform: translateY(-100px);
            transition: all .5s;
        }
    }

    .reportContent {
        width: 400px;
        line-height: 25px;
        box-sizing: border-box;
        padding: 20px 10px 10px 10px;
        height: @content_height;
        background-color: #5ab7ce;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .reportImage {
        height: @content_height;
        width: 150px;
        height: 150px;

        &>img {
            width: 150px;
            height: 150px;
        }
    }

    .button {
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

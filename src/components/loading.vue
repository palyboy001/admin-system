<template>
    <div class="container flex center">
        <div class="content loading flex center" v-if="loading">
            <!-- <el-button type="primary" :loading-icon="Eleme" :bg="true" loading>Loading</el-button> -->
            <svg class="spinner" width="30px" height="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <!-- fill：圆的背景， stroke-width：边框的宽度，stroke：边框的颜色-->
                <circle class="path" fill="none" stroke-width="3" stroke="red" stroke-linecap="round" cx="15" cy="15"
                    r="12">
                </circle>
            </svg>
            <span class="icon_text">正在加载···</span>
        </div>
        <div class="content error flex center" v-if="error">
            <SVGIcon class="icon" icon-name="icon-cuowu1"></SVGIcon>
            <span class="icon_text">加载失败</span>
        </div>
        <div class="content empty flex center" v-if="empty">
            <SVGIcon class="icon" icon-name="icon-meiyoudingdan-01"></SVGIcon>
            <span class="icon_text">空空如也 ~</span>
        </div>
    </div>
</template>

<script lang='ts' setup>
import SVGIcon from './SVGIcon.vue';

defineProps({
    loading:{
        type:Boolean,
        default:false
    },
    error:{
        type:Boolean,
        default:false
    },
    empty:{
        type:Boolean,
        default:false
    }
})

</script>
<style lang='less' scoped>
// 线条宽度
@offset: 187;
@duration: 1.4s;

.container {
    margin: 5px;
    height: 50px;

    .content {
        .icon {
            position: relative;
            top: 2px;
            width: 18px;
            height: 18px;
            padding-right: 5px;
        }

    }

    .loading {
        .icon_text {
            margin-left: 5px;
        }

        .spinner {
            animation: rotator @duration linear infinite;
        }

        @keyframes rotator {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(270deg);
            }
        }

        .path {
            stroke-dasharray: @offset;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation:
                dash @duration ease-in-out infinite,
                colors (@duration*4) ease-in-out infinite;
        }

        @keyframes colors {
            0% {
                stroke: #4285F4;
            }

            25% {
                stroke: #DE3E35;
            }

            50% {
                stroke: #F7C223;
            }

            75% {
                stroke: #1B9A59;
            }

            100% {
                stroke: #4285F4;
            }
        }

        @keyframes dash {
            0% {
                stroke-dashoffset: @offset;
            }

            50% {
                stroke-dashoffset: (@offset/4);
                transform: rotate(135deg);
            }

            100% {
                stroke-dashoffset: @offset;
                transform: rotate(450deg);
            }
        }
    }

}
</style>

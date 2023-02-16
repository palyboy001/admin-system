<template>
    <div class="content body-content" @scroll="loadImg" :style="contentStyle">
        <slot></slot>
        <button class="stick" @click="stick">置顶</button>

    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/store'

const props = defineProps({
    topClientHeight: {
        type: Number,
        default: 0
    }
})

// 获取store
const userStore = useUserStore();

// 内容的宽高
let contentStyle = reactive({
    width: "",
    height: ""
})

console.log(props.topClientHeight);

onMounted(() => {
    contentStyle.width = userStore.contentValue.width;
    contentStyle.height = (Number(userStore.contentValue.height.split("p")[0]) - props.topClientHeight) + 'px';
})

// 通过emit给父组件传值
const emit = defineEmits<{
    (event: 'ScrollBottom'):void
}>()


// 距离滚动到底部多少
let bottom_margin = ref(20)

// 获取路由组件
let chidren = ref()
// 监听内容滚动
const loadImg = (event: UIEvent) => {
    let el = event.target as HTMLElement
    // el.scrollTop:整个滚动区域的头部，距离滚动显示区域的头的距离
    // el.clientHeight:滚动可视区域的高度

    if (el.scrollTop + el.clientHeight >= (el.scrollHeight - bottom_margin.value)) {
        // alert("到底部啦")
        // chidren.value.loadImg();
        emit("ScrollBottom");
    }
}

// 滚动到顶部
const stick = () => {
    let perent = document.getElementsByClassName("body-content")[0];
    console.log(perent.scrollTop);
    let top = perent.scrollTop
    let time = setInterval(() =>{
        top = top - 10
        perent.scrollTop = top;
        if(top <= 0){
            clearInterval(time)
        }
    },0)
}


</script>
<style lang='less' scoped>
.content {
    transition: all .5s;

    .stick {
        position: fixed;
        bottom: 50px;
        right: 100px;
    }
}
</style>

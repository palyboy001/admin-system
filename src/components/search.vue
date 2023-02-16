<template>
  <div class="container">
    <el-input class="input" v-model="input" :placeholder="title" clearable @keydown.enter="search" />
    <el-button class="button" type="primary" @click="search">搜索</el-button>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

defineProps({
    title:{
        type:String,
        default:"请输入搜索内容",
    }
})

const input = ref("")

// 定义返回格式
const emit = defineEmits<{
    (event: 'getSearch',value:string,btn:boolean): void,
}>()

// 点击搜索
const search = function(){
    // 返回格式
    emit('getSearch',input.value,true);
}

</script>
<style lang='less' scoped>
// 搜索框，搜索按钮的高度
@height_button:40px;
.container{
    position: absolute;
    right: 100px;
    .input{
        font-size: 16px;
        width: 400px;
        height: @height_button;
    }
    .button{
        margin: 10px;
        width: 80px;
        height: @height_button;
    }
}
</style>

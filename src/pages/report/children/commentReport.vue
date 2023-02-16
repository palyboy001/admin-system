<template>
  <div class="container">
    <div class="top flex" ref="top">
      <search @getSearch="getSearch" :title="'请输入需要搜索内容'"></search>
    </div>
    <scrollContentBox :topClientHeight="topHeight" @ScrollBottom="loadImg">
      <div>
        <ReportView v-for="item,index in reports" :reportMessage="item"></ReportView>
        <div id="await" ref="await">
          <loading v-if="loading_" loading></loading>
          <loading v-if="error_" error></loading>
          <loading v-if="empty_" empty></loading>
          <el-empty description="空空如也~" v-if="closeAllLoading" />
        </div>
      </div>
    </scrollContentBox>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import search from '@/components/search.vue'
import scrollContentBox from '@/components/scrollContentBox.vue'
import ReportView from '@/components/report.vue'
import loading from '@/components/loading.vue'
import { getReportMessage } from "@/request/api"
import { ReportStrvice,Report,Methods } from '@/types/interfaces'
import { useUserStore } from '@/store'
import { isEmpty } from '@/javascript/public'
import { ElMessage } from 'element-plus'

const userStore = useUserStore();

// 定义显示正在等待框
let loading_ = ref(true);
const setLoading = (value: boolean): void => {
  if (value) {
    error_.value = false
    empty_.value = false
  }
  loading_.value = value
}
// 网络错误
let error_ = ref(false);
const setError = (value: boolean): void => {
  if (value) {
    loading_.value = false
    empty_.value = false
  }
  error_.value = value
}
// 内容为空
let empty_ = ref(false)
const setEmpty = (value: boolean): void => {
  if (value) {
    error_.value = false
    loading_.value = false
  }
  empty_.value = value
}
let closeAllLoading = ref(false)
// 如果第一次为空，其余为必须置为false
const closeAllLoadingBtn = (currentBtn: boolean): void => {
  closeAllLoading.value = currentBtn
  if(currentBtn){
    loading_.value = false;
    error_.value = false;
    empty_.value = false;
  }
}

// 获取搜索栏
let top = ref();
let topHeight = ref(60)
onMounted(() => {
  console.log(top.value.clientHeight);

  topHeight.value = top.value.clientHeight
})
// 保存获取到的信息
const reports = reactive<Array<ReportStrvice>>([]);


// 获取全部举报信息
onMounted(() => {
  // 刚刚开始调用
  requestService({});
})

// 搜索设置
// 第几次搜索
let key = ref(0);
// 一次搜索几条
const end = ref(10)
// 当前的搜索模式
let method:Methods = 'onload';
// 点击搜索
const getSearch = () => {
  // 更改加载方式
  method = 'search';
}

// 滚动到底部时
const loadImg = () => {
  switch(method){
    case 'onload':
      requestService({});
      break;
    case 'search':
      getSearch();
      break;
  }
}

// 请求后端数据
const requestService = (value:Report) =>{
  let data = {
    key:key.value,
    end:end.value,
    reportType:"1002"
  }
  getReportMessage(Object.assign(data,value), userStore.userInfo.user.password).then(res => {
    console.log(res);
    res.data.forEach(element => {
      reports.push(element);
    });
    // 如果为空
    if(res.data.length < end.value){
      setEmpty(true)
    }
    // 第一次请求为空
    if(key.value === res.data.length){
      closeAllLoadingBtn(true);
    }
    key.value++;
  }).catch(err => {
    setError(true);
  })
}

</script>
<style lang='less' scoped>
.container {
  .top {
    height: 60px;
    width: 100%;
    z-index: 10;
    background-color: #FFFFFF;
    justify-content: center;
    border-bottom: 1px solid #7a7a7a79;
    // background-color: red;
  }
}
</style>

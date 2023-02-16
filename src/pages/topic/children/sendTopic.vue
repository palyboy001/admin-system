<template>
  <div class="container">
    <div class="top flex" ref="top">
      <search @getSearch="getSearch" :title="'请输入需要搜索的话题内容'"></search>
    </div>
    <scrollContentBox :topClientHeight="topHeight" @ScrollBottom="loadImg">
      <div>
        <topicComponents :topic="item" v-for="item, index in topics" :index="index" :key="item.id" @delete="delete_"
          @ban="ban" @limit="limit"></topicComponents>
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
import { ref, reactive, onMounted, provide } from 'vue'
import search from '@/components/search.vue'
import scrollContentBox from '@/components/scrollContentBox.vue'
import topicComponents from '@/components/topic.vue'
import loading from '@/components/loading.vue'
import { getFindTopic, getAllTopic, delete_topic } from "@/request/api"
import { Topic,Methods } from '@/types/interfaces'
import { useUserStore } from '@/store'
import { isEmpty } from '@/javascript/public'
import { ElMessage } from 'element-plus'

// 获取store
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
  topHeight.value = top.value.clientHeight
})

// 保存话题数组
let topics = reactive<Array<Topic>>([]);

// 第几次请求
let key = ref(0)
// 一次请求多少条
let end = ref(10)
// 是否当前在请求中
let reques = ref(false)
// 当前请求模式，search:搜索模式，onload:直接加载得方式
let method: Methods = 'onload';
// 保存搜索关键词
let keywords = '';

// 当点击搜索时查询
const getSearch = (value: string, btn: boolean) => {
  if (btn) {
    // 把长度置为0即可清空数组
    // topics.length = 0
    // 使用方法切割，会改变元素组
    // topics.splice(0,topics.length);
    topics.splice(-topics.length)
    key.value = 0;
    reques.value = false;
  }
  keywords = value;
  if (!btn || reques.value) {
    return;
  }

  // 打开正在加载的弹窗
  setLoading(true);
  reques.value = true;
  let data = { end: end.value, key: key.value, keywords: value }
  getFindTopic(data).then(res => {
    if(res.data.length === key.value){
      closeAllLoadingBtn(true);
      return;
    }
    // 请求结束，loading弹窗关闭
    setLoading(false);
    res.data.forEach(item => {
      topics.push(item);
    })
    // 判断是否为空,后续没有话题了
    if (isEmpty(res.data) || res.data.length < end.value) {
      console.log("空了");
      setEmpty(true);
      return;
    }
    key.value++;
    reques.value = false
    method = 'search';
  }).catch(err => {
    console.log("网络错误，请重试", err);
    // 底部正在等待的区域消息为空
    setError(true)
    reques.value = false
  })
}

// 查询所有话题
const onLoadTopic = () => {
  if (reques.value) {
    return;
  }
  reques.value = true;
  // 打开正在加载的弹窗
  setLoading(true);
  let data = { end: end.value, key: key.value, userID: userStore.userInfo.user.userID }
  getAllTopic(data).then(res => {
    if(res.data.length === key.value){
      closeAllLoadingBtn(true);
      return
    }
    // 请求结束，loading弹窗关闭
    setLoading(false);
    res.data.forEach(item => {
      topics.push(item);
    })
    // 判断是否为空
    if (isEmpty(res.data) || res.data.length < end.value) {
      console.log("空了");
      setEmpty(true);
      reques.value = true
      return;
    }
    key.value++
    reques.value = false;
    method = 'onload';
  }).catch(err => {
    console.log("查询失败", err);
    setError(true)
    reques.value = false
  })
}

// 点击删除按钮
const delete_ = (index: number): void => {
  console.log("点击了删除按钮", index);
  // 获取话题的id，以及发布用户的id
  let data = {
    id: topics[index].id,
    userID: topics[index].userRole.userID,
    headers: {
      'token': userStore.userInfo.user.password
    }
  }
  delete_topic(data).then(res => {
    console.log(res);
    if (res.data) {
      // 表示从index位置开始删除一个元素，index=0,则删除第0个元素
      try {
        topics.splice(index, 1);
        ElMessage({
          message: "删除成功!",
          type: "success"
        })
      }catch(e){
        console.log(e);
        ElMessage({
        message:"网络错误，删除失败，请重试",
        type:"error"
      })
      }
      
    } else {
      ElMessage({
        message: "网络错误，删除失败，请重试",
        type: "error"
      })
    }
  }).catch(err => {
    console.log("未知错误", err);
  })

}

// 点击封禁按钮
const ban = (index: number): void => {
  console.log("点击了封禁按钮", index);

}

// 点击限流按钮
const limit = (index: number): void => {
  console.log("点击了限流按钮", index);

}

// 渲染完成方法，声明周期函数
onMounted(() => {
  // 初始化页面
  onLoadTopic()
})

// 滚动方法
const loadImg = () => {
  switch (method) {
    case 'onload':
      onLoadTopic();
      // console.log("加载方式请求话题");
      break;
    case 'search':
      getSearch(keywords, false);
      // console.log("搜索得方式请求话题");
      break;
  }
}

// 改变底部正在等待的元素
const addButton = (name: string): void => {
  let template_ = `<loading ${name}></loading>`
  // 获取div
  provide("await", template_);
}

// 导出函数给父组件执行
defineExpose({
  loadImg
})


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

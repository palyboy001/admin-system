<template>
  <div id="container" :style="{ 'min-height': systemValue.height, 'minWidth': systemValue.width }">
    <router-view></router-view>
    <div class="loading flex center" :style="{ 'min-height': systemValue.height, 'minWidth': systemValue.width }" v-if="loading_">
      <loading loading></loading>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { autoLogin } from "@/request/api"
import { useUserStore } from './store';
import { storeToRefs } from 'pinia'
import loading from '@/components/loading.vue'
import router, { formmtinoMeta, addRouter } from '@/router'
import { Router_interface } from '@/types/interfaces'
import { ElMessage } from 'element-plus'


const userStore = useUserStore()
let { systemValue } = storeToRefs(userStore)

// 正在加载
let loading_ = ref(true);

onBeforeMount(() => {
  console.log("app创建");
  let width = window.innerWidth + 'px';
  let height = window.innerHeight + 'px';

  // 保存宽高
  userStore.chageSystemInfo({ width, height })

  // 保存宽高

  // 使用token自动登录
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  autoLogin({ password: token, userID }).then(res => {
    console.log(res);
    
    if (res.code === '1022') {
      console.log("登录过期");
      
      // ElMessage({
      //   message: '登录过期,请重新登录',
      //   type: 'error',
      // })
      router.push('/login')
    }
    console.log("自动登录成功", res.data);
    // 保存用户信息
    userStore.chageUserInfo(res.data)
    // 格式化路由的meta
    let new_arr = formmtinoMeta(res.data.router as Array<any>)
    // 保存路由信息
    userStore.chageRoutes(new_arr as Array<Router_interface>);
    // 将token保存本地
    localStorage.setItem("token", res.data.user.password);
    localStorage.setItem("userID", res.data.user.userID);
    // 动态添加路由
    addRouter(new_arr as Array<Router_interface>);
    // 设置路由状态
    userStore.chageRouter(true)
    // 关闭正在加载页面
    loading_.value = false;
    // 跳转到主页
    router.push('/index')
  }).catch(err => {
    console.log("自动登录失败", err);
    // 关闭正在加载页面
    loading_.value = false;
    ElMessage({
      message:"登录过期，请重新登录",
      type:"error"
    })
    // 清除token
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push('/login')
  })

})

</script>
<style lang='less' scoped>
#container{
  .loading{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
}
</style>

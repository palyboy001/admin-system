<template>
  <div>
    
  </div>
</template>

<script lang='ts' setup>
import router from '@/router';
import { ref,onMounted } from 'vue'
onMounted(() =>{
    router.push({name:"index"})
})
</script>
<style lang='less' scoped>
</style>

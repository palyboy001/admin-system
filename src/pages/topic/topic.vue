<template>
  <div class="container flex">
      <content></content>
  </div>
</template>

<script lang='ts' setup>
import content from '@/components/content.vue'
</script>
<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>

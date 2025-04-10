<script setup lang='ts'>
import { ref, reactive, onMounted, provide } from 'vue';
// component
// import Header from './components/Header/index.vue'


onMounted(() => {
  setTimeout(() => {
    if (document.getElementById('loading-mask')) (document.getElementById('loading-mask') as Element).remove();
  }, 3000)

});

// 全屏
const fullScreenRef = ref()
const handleFullScreen = () => {
  if (fullScreenRef.value.requestFullscreen) {
    fullScreenRef.value.requestFullscreen();
  }
}
provide('fullScreen', handleFullScreen)
</script>

<template>
  <div class="enter-container" ref="fullScreenRef">
    <!-- <Header msg="我的"></Header> -->

      <RouterView></RouterView>
  </div>
</template>

<style lang='scss' scoped>
.enter-container {
}
</style>
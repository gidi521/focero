import { onMounted, onUnmounted, ref } from 'vue';

export default function () {

    onMounted(() => {
        window.addEventListener('scroll', getScrollDistance, true)
        getScrollDistance()
    })

    let scrollTopNum = ref(0)
    const getScrollDistance = () => {
        scrollTopNum.value = Math.round(window.scrollY)
    }

    onUnmounted(() => {
        // 组件卸载时移除滚动事件监听器
        window.removeEventListener('scroll', getScrollDistance);
    })

    return {
        scrollTopNum
    }

}
/**
 * description 让元素自动滚动到底
 * 使用：v-scrollDown.y="scrollHeight"
 */
import type { Directive, DirectiveBinding } from "vue";

const setHeight: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // console.log('scollDown-mounted', el, binding);
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        // if (!el) return
        // const children = Array.from(el.children)[0];
        // // if()
        // children.style!.height = 'auto'
        // children.style!.height = children.scrollHeight + 'px'
        // console.log('Child nodes:', children);
        // console.log('Child nodes:', children.scrollHeight);
    }
};

export default setHeight;

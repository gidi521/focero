/**
 * v-t
 * 为了简化模板中的翻译
 * 使用方法：
 * v-t="'welcome'"
 * v-t="{ path: 'test', values: { name: 'Vue Developer' } }"  处理这种配置 {test: "测试, {name}!"}
 */
import type { Directive, DirectiveBinding } from "vue";
import { i18n } from '../../plugins/i18n/index'
interface ElType extends HTMLElement {
    __handleClick__: () => any;
}

const translate: Directive = {
    mounted(el: ElType, binding: DirectiveBinding, vnode: any) {
        const { value } = binding;
        
        if (typeof value === 'string') {
            console.log('i18n.global.t(value)',i18n.global.t(value));
            
            el.innerText = i18n.global.t(value)
        } else if (typeof value === 'object') {
            const { path, values } = value;
            el.innerText = i18n.global.t(path, values)
        }
    },
    updated(el: ElType, binding: DirectiveBinding) {
        const { value } = binding;
        
        if (typeof value === 'string') {
            el.innerText = i18n.global.t(value)
        } else if (typeof value === 'object') {
            const { path, values } = value;
            el.innerText = i18n.global.t(path, values)
        }
    }
};

export default translate;

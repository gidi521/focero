import { App, Directive } from "vue";

import t from "./modules/t"

const directivesList: { [key: string]: Directive } = {
    t,
};

// 通过插件的方式全局注册自定义指令
const directives = {
    install(app: App<Element>) {
        Object.keys(directivesList).forEach(key => {
            app.directive(key, directivesList[key]);
        });
    }
};

export default directives;

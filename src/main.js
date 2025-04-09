import { createApp } from 'vue'
import App from './App.vue'

// 字体图标
import './assets/iconfont/iconfont.css'
// 全局css样式
import './styles/global.scss'

// 路由
import router from './router'
// 批量注册插件
import plugins from '@/plugins/index'
// 自定义指令
import directives from '@/directives/index'

const app = createApp(App)
app.use(router)
    .use(plugins)
    .use(directives)
    .mount('#app')

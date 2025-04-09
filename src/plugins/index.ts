import { App } from 'vue'

// 国际化
import {i18n} from './i18n'

const pluginList = [   
    i18n
]
const plugins = {
    install(app: App<Element>) {
        Object.entries(pluginList).forEach(([, v]) => {
            app.use(v)
        })
    }
}

export default plugins

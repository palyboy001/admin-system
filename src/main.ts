import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 路由组件
import router from "./router"

// pinia   类似与vuex
import { createPinia } from 'pinia'

// 引入消息提示框得样式
import 'element-plus/theme-chalk/src/message.scss'
// 引入消息弹窗样式
import 'element-plus/theme-chalk/src/message-box.scss'
// 导入图标 element-plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册全局组件，SVG组件
import SVGIconVue from './components/SVGIcon.vue'

const pinia = createPinia()
const app = createApp(App)

// 动态添加element-plus组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SVGIcon',SVGIconVue);
app.use(router).use(pinia).mount('#app')

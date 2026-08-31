import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
// @ts-ignore
import 'virtual:svg-icons-register'
import gloablComponent from '@/components/index'
import '@/styles/index.sass'
const app = createApp(App)
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(gloablComponent)
app.use(router)
app.mount('#app')

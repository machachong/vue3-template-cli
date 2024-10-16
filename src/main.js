// 重置CSS样式
import "normalize.css/normalize.css"
import { createApp } from "vue"
import pinia from "./stores/index"
import App from "./App.vue"
import router from "./router"
import "element-plus/dist/index.css"
import "@/assets/style/index.scss"
const app = createApp(App)

app.use(pinia).use(router)

// 代码对比
import VueDiff from "vue-diff"
import "vue-diff/dist/index.css"
import sql from "highlight.js/lib/languages/sql.js"
VueDiff.hljs.registerLanguage("sql", sql)

app.use(VueDiff)

// 指令统一绑定
import directives from "@/directives/index"
directives(app)

// 全局组件统一管理
import useComponents from "@/components/index"
app.use(useComponents)

// 引入boke ui
import bokeui from "../boke-ui/docs/src/components/index.js"
app.use(bokeui)

// 注册svg图标
import svgIcon from "@/assets/svg/index.js"
app.use(svgIcon)

app.mount("#app")

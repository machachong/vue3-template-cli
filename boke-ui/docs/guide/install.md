### 快速上手

::: tip 提示

boke-ui 基础组件基于 Element-plus 再次封装

:::

### 安装

作为子模块引入

具体使用方法见文档：<https://boke.feishu.cn/wiki/Gn5UwpBUSiAVAWkjWRDcwiyUnfh?from=from_copylink>

### 使用

> #### 前提条件：使用项目必须全局注册 Element-plus 组件库

```js
// main.js
import bokeui from '@boke-ui';
import '@boke-ui/lib/style.css';
app.use(bokeui);
```

### docs 文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.js        # 全局变量定义
|  │  └─ plugins.js       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.js         # 暴露VPDemo组件
│  └─ config.js           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.js         # vite 全局配置文件（支持tsx）
```

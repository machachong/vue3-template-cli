import DefaultTheme from 'vitepress/theme';
// 演示组件
import 'vitepress-theme-demoblock/theme/styles/index.css';
import { useComponents } from './useComponents';
import ElementPlus from 'element-plus';

import locale from 'element-plus/lib/locale/lang/zh-cn';

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 基于element-plus二次封装基础组件
// import TuiPlus from '../../../packages';
import bokeui from '../../src/components';
import 'element-plus/dist/index.css';
import '../../public/css/index.scss'; // 静态css资源
export default {
  enhanceApp({ app }) {
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale, // 语言设置
    });
    app.use(bokeui);
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    useComponents(app);
  },
  ...DefaultTheme,
};

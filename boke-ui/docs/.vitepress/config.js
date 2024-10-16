import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import sidebar from './configs/sidebar.js';
import nav from './configs/nav.js';
const base = process.env.BASE || '/';
export default defineConfig({
  title: 'boke-ui',
  lang: 'cn-ZH',
  lastUpdated: true,
  base: base,
  description: '开发组前端组件库', // 描述信息
  head: [
    // 网站头部的配置
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'logo.svg' }],
  ],
  appearance: true,
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    siteTitle: 'boke ui',
    outline: 3,
    editLinks: true,
    editLinksTest: '在github上编辑此页',
    lastUpdated: '上次更新',
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    demoblock: {
      root: {
        'view-source': 'View source',
        'hide-source': 'Hide source',
        'edit-in-editor': 'Edit in Playground',
        'edit-on-github': 'Edit on GitHub',
        'copy-code': 'Copy code',
        'copy-success': 'Copy success',
        'copy-error': 'Copy error',
      },
      zh: {
        'view-source': '查看源代码',
        'hide-source': '隐藏源代码',
        'edit-in-editor': '在 Playground 中编辑',
        'edit-on-github': '在 Github 中编辑',
        'copy-code': '复制代码',
        'copy-success': '复制成功',
        'copy-error': '复制失败',
      },
    },
  },
  markdown: {
    anchor: { permalink: false },
    toc: { includeLevel: [1, 2] },
    config: (md) => {
      md.use(demoBlockPlugin);
      // md.use(demoBlockPlugin, {
      //   cssPreprocessor: 'scss',
      // });
    },
  },
});

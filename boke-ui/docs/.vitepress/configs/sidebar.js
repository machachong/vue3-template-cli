export default {
  '/guide/': getGuideSidebar(),
  '/components/': getComponentsSidebar(),
  '/utils/': getUtilsSidebar(),
};

function getComponentsSidebar() {
  return [
    {
      text: 'Basic 基础组件',
      children: [
        {
          text: 'Button 按钮',
          link: '/components/button',
        },
        {
          text: 'Title 标题',
          link: '/components/title',
        },
      ],
    },
    {
      text: 'form 表单组件',
      children: [
        {
          text: 'Autocomplete 自动补全输入框',
          link: '/components/autocomplete',
        },
        {
          text: 'Input 输入框',
          link: '/components/input',
        },
      ],
    },
    {
      text: 'pro 高阶组件',
      children: [
        {
          text: 'Form 高阶表单',
          link: '/components/form',
        },
        {
          text: 'Table 高阶表格',
          link: '/components/table',
        },
      ],
    },
  ];
}

function getUtilsSidebar() {
  return [
    {
      text: '格式化工具',
      children: [
        {
          text: '日期事件格式化',
          link: '/utils/date',
        },
        {
          text: '数值格式化',
          link: '/utils/number',
        },
      ],
    },
  ];
}
function getGuideSidebar() {
  return [
    {
      text: '基础',
      children: [
        {
          text: '安装',
          link: '/guide/install',
        },
      ],
    },
  ];
}

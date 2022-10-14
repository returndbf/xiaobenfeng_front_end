export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/store/index'
  ],
  tabBar: {
    color: 'rgba(68, 68, 68, 1)',
    selectedColor: 'rgba(68, 68, 68, 1)',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '今日任务',
        iconPath: './assets/tabbar/hellokitty.png',
        selectedIconPath: './assets/tabbar/hellokitty.png'
      },
      {
        pagePath: 'pages/store/index',
        text: '兑换商城',
        iconPath: './assets/tabbar/hellokitty.png',
        selectedIconPath: './assets/tabbar/hellokitty.png'
      }
      ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffeaea',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})

# vue-cnode
一个基于CNode社区API打造的 Vue SPA

## API
https://cnodejs.org/api

#### 目前已实现的功能：
主题首页、主题详情、新建主题、用户所收藏的主题、验证 accessToken 的正确性、获取未读消息数、获取已读和未读消息

#### 待实现：
编辑主题、收藏主题、取消主题、新建评论、为评论点赞、标记全部已读、标记单个消息为已读

## 在线展示
http://wongbrah.top/vue-cnode

## 技术栈：
前端：Vue.js, vue-cli, vue-router, vuex, axios, vue-infinite-scroll

后端：Node.js, Koa

## 运行：
源码clone到本地后：
```
// 进入文件夹
cd vue-cnode

// 安装项目所需依赖
npm install

// 调试
npm run dev

// 打包
npm run build
```

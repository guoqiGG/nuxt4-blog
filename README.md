# Nuxt 4 Blog

基于 Nuxt 4 的个人博客网站，支持 SSR 和静态生成。

## 功能特性

- ✨ 基于 Nuxt 4 框架
- 🎨 使用 Tailwind CSS 进行样式设计
- 📦 使用 Pinia 进行状态管理
- 📝 支持文章列表和详情页
- 📱 响应式设计，支持移动端
- 🚀 GitHub Pages 自动部署

## 技术栈

- **框架**: Nuxt 4
- **UI 框架**: Tailwind CSS
- **状态管理**: Pinia
- **部署**: GitHub Pages + GitHub Actions

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 部署

### GitHub Pages

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

1. 推送代码到 `gh-pages` 分支
2. GitHub Actions 会自动构建并部署
3. 在仓库设置中配置 Pages（已自动配置）

部署完成后，访问地址为：
```
https://guoqiGG.github.io/nuxt-blog
```

## 项目结构

```
nuxt-blog/
├── .github/workflows/  # GitHub Actions 配置
├── .vscode/           # VS Code 设置
├── assets/            # 静态资源
│   └── css/           # 样式文件
├── components/        # Vue 组件
├── layouts/           # 布局组件
├── pages/             # 页面路由
├── stores/            # Pinia 状态管理
├── server/            # 服务端 API
├── app.vue            # 主应用组件
├── nuxt.config.ts     # Nuxt 配置
├── tailwind.config.js # Tailwind CSS 配置
└── package.json       # 项目依赖
```

## 许可证

MIT

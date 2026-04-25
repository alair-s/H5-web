# 厦门旅游 H5

一个基于 React + TypeScript + Vite 构建的厦门旅游主题移动端 H5 展示页面，包含多页滚动、背景音乐、动效过渡等功能。

## 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 6
- **样式**：Tailwind CSS 4
- **动效**：Motion (Framer Motion)
- **截图**：html2canvas

## 功能特性

- 12 个全屏滚动页面（snap 吸附滚动）
- 背景音乐播放控制（支持切换、静音）
- 页面切换点击音效与完成音效
- IntersectionObserver 检测当前可视页面
- 响应式移动端布局

## 项目结构

```
src/
├── App.tsx                     # 根组件
├── Background/                 # 背景音乐配置
├── Component/                  # 公共组件
│   ├── BackgroundMusicProvider.tsx  # 音乐上下文 Provider
│   ├── Loading.tsx             # 加载页
│   └── PageMusic.tsx           # 页面音乐控制
├── Home/                       # 主页面
│   ├── index.tsx               # 页面入口（滚动容器）
│   ├── pages.ts                # 页面注册列表
│   ├── Page1/ ~ Page11/        # 各页面组件
│   └── types.ts                # 类型定义
└── data/
    └── postcardStore.ts        # 明信片数据存储
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 5175，局域网可访问）
npm run dev

# 类型检查 + 构建
npm run build

# 预览构建产物
npm run preview
```

## 部署

构建后将 `dist/` 目录同步到服务器：

```bash
rsync -avz --progress /Users/**/Desktop/H5/dist/ root@myServer:/workspace/H5/dist/
```

> 项目部署路径为 `/h5/`，已在 `vite.config.ts` 中通过 `base: '/h5/'` 配置。

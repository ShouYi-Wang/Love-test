# 项目技术架构设计

## 目录结构 
├── app/ # Next.js App Router 主目录
│ ├── layout.tsx # 根布局组件
│ ├── page.tsx # 首页组件
│ └── globals.css # 全局样式
├── public/ # 静态资源目录
├── .next/ # Next.js 构建输出目录
├── node_modules/ # 依赖包
└── 配置文件
├── package.json # 项目配置和依赖
├── tsconfig.json # TypeScript 配置
├── next.config.ts # Next.js 配置
├── tailwind.config.ts # Tailwind 配置
├── postcss.config.mjs # PostCSS 配置
├── eslint.config.mjs # ESLint 配置
└── .gitignore # Git 忽略配置


## 技术栈

- **框架**: Next.js 15.1.7
- **运行时**: React 19
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS
- **代码规范**: ESLint
- **开发服务器**: Turbopack
- **字体**: Geist (通过 next/font 优化)

## 主要特性

1. **App Router 架构**
   - 使用 Next.js 最新的 App Router 架构
   - 基于文件系统的路由
   - 支持布局和页面组件

2. **样式系统**
   - Tailwind CSS 实用工具类
   - 支持深色模式
   - CSS 变量控制主题
   - PostCSS 处理

3. **类型系统**
   - TypeScript 严格模式
   - 完整的类型定义
   - 模块解析优化

4. **开发体验**
   - ESLint 代码检查
   - 热更新
   - 路径别名 (@/*)
   - 开发服务器优化

5. **性能优化**
   - 字体优化加载
   - 图片组件优化
   - 自动代码分割

## 环境要求

- Node.js 版本: 支持 ES 模块
- 包管理器: npm/yarn/pnpm/bun

## 开发命令

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run start`: 启动生产服务器
- `npm run lint`: 运行代码检查
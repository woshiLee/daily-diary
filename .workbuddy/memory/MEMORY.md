# MEMORY.md - Long-term Memory

## 项目配置 (2026-04-09)

### 日常书 PWA 日记应用
- 仓库: github.com/woshiLee/daily-diary
- Firebase: daily-diary-de4a0.firebaseapp.com
- 本地开发服务器: `npx serve -l 8088` (必须用端口 8088)
- Firebase 使用 ES Module 方式加载，必须用 `type="module"` script

### 关键技术点
- Firebase ES Module 加载: 需要 `window.db` 全局暴露 + `waitForFirebase()` 轮询等待
- Service Worker: 只缓存 GET 请求 + 静态文件扩展名，其他全部穿透
- PWA 部署到 GitHub Pages 需要保留 `/daily-diary/` base 路径

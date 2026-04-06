# PWA 安装指南

## 在 iOS Safari 上安装

1. 在 Safari 浏览器中打开 index.html
2. 点击底部的"分享"按钮（方框带向上箭头）
3. 向下滚动，找到并点击"添加到主屏幕"
4. 点击右上角的"添加"按钮
5. 完成！现在你的主屏幕上会有"日记"App图标

## 在 Android Chrome 上安装

1. 在 Chrome 浏览器中打开 index.html
2. 点击地址栏右侧的"安装"图标（或菜单中的"添加到主屏幕"）
3. 点击"安装"
4. 完成！现在你的主屏幕上会有"日记"App图标

## PWA 特性

✅ 可以安装到手机主屏幕，像原生App一样使用
✅ 离线可用（已缓存所有资源）
✅ 全屏显示，隐藏浏览器地址栏
✅ 安全区域适配（支持刘海屏）
✅ 触摸交互优化

## 下一步：打包成真正的 iOS App

如果需要上架 App Store，可以使用 **Capacitor** 将此 PWA 打包成 iOS App。

需要的工具：
- Node.js
- Capacitor CLI
- Xcode（需要 Mac 电脑）
- Apple Developer 账号（$99/年）

具体步骤：
```bash
npm install @capacitor/core @capacitor/cli
npx cap init "每日日记" com.daily.diary
npx cap add ios
npx cap sync ios
npx cap open ios
```

然后在 Xcode 中打开项目，配置证书并打包发布。

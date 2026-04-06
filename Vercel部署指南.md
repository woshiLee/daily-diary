# 部署到Vercel（超简单步骤）

## 第一步：注册Vercel账号

1. 打开 https://vercel.com/signup
2. 点击 **Continue with GitHub**（如果有GitHub账号）
   - 或者选择邮箱注册
3. 按提示完成注册（免费）

---

## 第二步：安装Vercel CLI（可选）

如果你想用命令行部署，需要安装：

```bash
npm install -g vercel
```

但更简单的是**不用安装**，直接用网页版拖拽！

---

## 第三步：部署（最简单方法：拖拽）

### 方法A：网页版拖拽（推荐，最简单）

1. 登录 https://vercel.com/dashboard
2. 点击 **Add New** → **Project**
3. 在页面底部找到 **Import Git Repository**
4. 但更简单：直接用这个方法：

#### **使用"Deploy via CLI"的替代方案：**

1. 打开 https://vercel.com/new
2. 选择 **"Upload from Local"** 或者继续往下找
3. 如果找不到，用这个方法：

---

### 方法B：用GitHub部署（推荐，稍复杂但很标准）

#### 1. 创建GitHub仓库

1. 去 https://github.com 新建仓库
   - 仓库名：`daily-diary`
   - 设为**公开Public**
   - 点击 **Create repository**

#### 2. 上传项目文件

**方法：用Git命令（如果会用的话）**

```bash
cd "c:\Users\lee\WorkBuddy\20260404100053"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/daily-diary.git
git push -u origin main
```

**方法：网页上传（如果不会用Git）**

1. 在GitHub仓库页面，点击 **Upload files**
2. 把你项目文件夹里的所有文件拖进去（除了`.gitignore`已经排除的）
3. 填写提交信息：`Initial commit`
4. 点击 **Commit changes**

#### 3. 在Vercel导入

1. 回到 https://vercel.com/dashboard
2. 点击 **Add New** → **Project**
3. 找到你的 `daily-diary` 仓库，点击 **Import**
4. 按默认配置，点击 **Deploy**
5. 等待1-2分钟...

**完成！** 你会看到一个网址，比如：
```
https://daily-diary-xxx.vercel.app
```

---

## 第四步：在手机上测试

用你获得的Vercel网址，在手机浏览器打开：

### iOS：
1. Safari打开网址
2. 分享 → 添加到主屏幕

### Android：
1. Chrome打开网址
2. 安装 → 添加到主屏幕

---

## 更新应用

如果你修改了项目文件：

1. **用Git**：`git push` 后自动部署
2. **用网页**：重新上传文件到GitHub，Vercel自动更新

---

## 常见问题

### 找不到"Upload from Local"？

Vercel现在主要推荐用Git，所以方法B（GitHub部署）更稳定。

### 部署后访问不了？

- 检查是否选择了**公开Public**仓库
- 等待几分钟，Vercel可能还在构建

### 404错误？

- 检查 `vercel.json` 是否在项目根目录
- 检查 `index.html` 是否存在

---

## 需要帮助？

如果遇到问题，告诉我具体在哪一步卡住了，我帮你解决！

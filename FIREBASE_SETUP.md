# Firebase 配置指南

## 问题
当前错误：`Cloud Firestore API has not been used...` 和权限被拒绝。

## 解决步骤

### 1. 启用 Firestore 数据库

1. 访问 [Firebase 控制台](https://console.firebase.google.com/)
2. 选择项目 `daily-diary-de4a0`
3. 点击左侧菜单的 **Firestore Database**
4. 点击 **创建数据库**
5. 选择 **测试模式**（开发用）或 **生产模式**
6. 选择就近的区域（如 `asia-east1` 或 `asia-northeast1`）

### 2. 修改安全规则（测试用）

在 Firestore Database > 规则 中，暂时设置为允许所有读写：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **注意**：这只是开发测试用，正式上线前需要改为更严格的规则。

### 3. 启用 Storage（用于图片上传）

1. 点击左侧菜单的 **Storage**
2. 点击 **开始使用**
3. 同样选择 **测试模式**（允许所有读写）
4. 选择相同的区域

### 4. 配置 Storage CORS（解决跨域问题）

安装 gcloud CLI 后运行：

```bash
gsutil cors set cors.json gs://daily-diary-de4a0.firebasestorage.app
```

或者将 Storage 规则改为公开访问：

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 验证配置

完成以上步骤后：
1. 刷新应用页面
2. 尝试新建一篇日记（只写文字，不加图片）
3. 如果成功，再尝试添加图片

## 生产环境安全规则（后续使用）

Firestore：
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /entries/{entryId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Storage：
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

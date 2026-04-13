// Service Worker 修复版：彻底解决POST缓存报错，仅缓存静态资源
const CACHE_NAME = 'app-static-cache-v2';
// 仅缓存的静态资源后缀
const STATIC_FILE_EXTENSIONS = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff2', '.woff'];

// 安装：立即激活新SW
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 激活：清理旧缓存，接管所有页面
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 核心修复：fetch事件，彻底拦截非GET请求
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 关键修复1：非GET请求，直接走网络，完全不碰缓存
  if (request.method !== 'GET') {
    return;
  }

  // 关键修复2：只缓存静态资源，跳过所有API/接口请求
  const isStaticFile = STATIC_FILE_EXTENSIONS.some(ext => request.url.endsWith(ext));
  // 页面导航请求（mode=navigate）直接走网络，确保PWA独立模式能正常打开
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }
  if (!isStaticFile) {
    return;
  }

  // 静态资源缓存逻辑：缓存优先，网络兜底
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // 缓存命中直接返回
      if (cachedResponse) {
        return cachedResponse;
      }
      // 未命中则请求网络，并存入缓存
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});

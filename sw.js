const CACHE_NAME = 'daily-diary-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/mood_happy.png',
  '/mood_calm.png',
  '/mood_tired.png',
  '/mood_sad.png',
  '/mood_angry.png',
  '/HuiwenMincho.otf',
  '/SpecialElite.ttf',
  '/icon-192.png',
  '/icon-512.png'
];

// 安装Service Worker并缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// 激活新的Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 拦截网络请求：Firebase API 请求走网络，静态资源优先缓存
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Firebase 和外部 API 请求始终走网络（不缓存）
  if (url.hostname.includes('firebaseio.com') || 
      url.hostname.includes('googleapis.com') || 
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('jsdelivr.net')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        // 克隆并缓存外部资源（如 Firebase SDK、html2canvas）
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // 网络失败时尝试缓存
        return caches.match(event.request);
      })
    );
    return;
  }

  // 静态资源：优先缓存，更新时从网络获取
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // 后台更新缓存
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {});
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

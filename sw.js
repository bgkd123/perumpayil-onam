const CACHE_NAME = 'perumpayil-v6';
const urlsToCache = [
  'https://bgkd123.github.io/perumpayil-onam/',
  'https://bgkd123.github.io/perumpayil-onam/index.html',
  'https://bgkd123.github.io/perumpayil-onam/manifest.json',
  'https://bgkd123.github.io/perumpayil-onam/Logo.png',
  'https://bgkd123.github.io/perumpayil-onam/maveli.png',
  'https://bgkd123.github.io/perumpayil-onam/onambg.mp3',
  'https://bgkd123.github.io/perumpayil-onam/onam_wish.mp4',
  'https://bgkd123.github.io/perumpayil-onam/bg01.webp',
  'https://bgkd123.github.io/perumpayil-onam/onam26.webp',
  'https://bgkd123.github.io/perumpayil-onam/Pacifico.ttf',
  'https://bgkd123.github.io/perumpayil-onam/TarmilesAction.otf',
  'https://bgkd123.github.io/perumpayil-onam/MLU-Anakha.ttf',
  'https://bgkd123.github.io/perumpayil-onam/icon-192.png',
  'https://bgkd123.github.io/perumpayil-onam/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
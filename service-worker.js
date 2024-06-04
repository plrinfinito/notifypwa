self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('notifypwa-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/icon.png' // Certifique-se de incluir todos os recursos necessários
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // Remove caches que não correspondem à versão atual
                    return cacheName.startsWith('notifypwa-') && cacheName !== 'notifypwa-v1';
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
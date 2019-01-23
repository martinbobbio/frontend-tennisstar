const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_LIMIT = 50;

function cleanCache(cacheName,numberItems){
    caches.open(cacheName).then(cache => {
        return cache.keys().then(keys => {
            if(keys.length > numberItems){
                cache.delete(keys[0]).then(cleanCache(cacheName,numberItems))
            }
        });
    });
}


self.addEventListener("install", event =>{
    
    const cachePromisse = caches.open(CACHE_STATIC_NAME).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/assets/images/logo.png',
            '/manifest.json',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            '/assets/js/app.js',
        ])
    });
    event.waitUntil(cachePromisse);

});

self.addEventListener("fetch", event =>{
    
    if(event.request.method !== "POST"){
    //CACHE NETWORK
    /*const cacheResponse = caches.match(event.request).then(resOffline => {
        if(resOffline) return resOffline;

        return fetch(event.request).then(resOnline => {
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                cache.put(event.request, resOnline);
                cleanCache(CACHE_DYNAMIC_NAME, CACHE_LIMIT);
            });
            return resOnline.clone();
        });
    });*/
    //NETWORK CACHE
    const cacheResponse = fetch(event.request).then(res => {
        caches.open(CACHE_DYNAMIC_NAME).then(cache => {
            cache.put(event.request, res);
            //cleanCache(CACHE_DYNAMIC_NAME, CACHE_LIMIT);
        });
        return res.clone();
    }).catch(err => {
        return caches.match(event.request);
    });

    event.respondWith(cacheResponse);
    }
    

});
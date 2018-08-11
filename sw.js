var STATIC_CACHE = 'public-toilets-amsterdam-static-cache-v3'

// listen for outgoing network request
self.addEventListener('fetch', function (event) {
    // try to find response object in the cache
    // associated with current request
    event.respondWith(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) return response;

                return fetch(event.request).then(function (networkResponse) {
                    return networkResponse;
                });
            });
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('service worker activate');
    var cacheWhitelist = [STATIC_CACHE];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll(
                [
                    "./",
                    "css/lib/leaflet/leaflet.css",
                    "css/lib/onsen/css/onsenui.min.css",
                    "css/lib/onsen/css/onsen-css-components.min.css",
                    "css/style.css",
                    "cordova.js",
                    "js/data.js",
                    "js/offline.js",
                    "js/main.js",
                    "https://cdn.polyfill.io/v2/polyfill.min.js",
                    "lib/js/onsenui.min.js",
                    "lib/js/leaflet.js",
                    "js/localization.js",
                    "css/lib/onsen/css/ionicons/css/ionicons.min.css",
                    "css/lib/onsen/css/material-design-iconic-font/css/material-design-iconic-font.min.css",
                    "css/lib/onsen/css/font_awesome/css/font-awesome.min.css",
                    "views/map.html",
                    "cordova_plugins.js",
                    "css/lib/onsen/css/ionicons/fonts/ionicons.ttf",
                    "css/lib/leaflet/images/marker-icon.png",
                    "https://a.tile.openstreetmap.org/15/16829/10768.png",
                    "https://c.tile.openstreetmap.org/15/16829/10767.png",
                    "https://c.tile.openstreetmap.org/15/16828/10768.png",
                    "https://b.tile.openstreetmap.org/15/16830/10768.png",
                    "https://b.tile.openstreetmap.org/15/16829/10769.png",
                    "https://b.tile.openstreetmap.org/15/16828/10767.png",
                    "https://a.tile.openstreetmap.org/15/16830/10767.png",
                    "https://c.tile.openstreetmap.org/15/16830/10769.png",
                    "https://a.tile.openstreetmap.org/15/16828/10769.png",
                    "css/lib/leaflet/images/marker-shadow.png",
                    "css/lib/leaflet/images/marker-icon-blue.png",
                    "plugins/cordova-plugin-admobpro/www/AdMob.js",
                    "plugins/cordova-plugin-device/www/device.js",
                    "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
                    "plugins/cordova-plugin-dialogs/www/notification.js",
                    "plugins/cordova-plugin-dialogs/www/browser/notification.js",
                    "js/browser.js",
                    "views/about.html",

                    // offline tiles
                    "maps/offline/13/4206/2691.png",
                    "maps/offline/13/4206/2692.png",
                    "maps/offline/13/4207/2691.png",
                    "maps/offline/13/4207/2692.png",
                    "maps/offline/13/4208/2691.png",
                    "maps/offline/13/4208/2692.png",
                    "maps/offline/14/8413/5383.png",
                    "maps/offline/14/8413/5384.png",
                    "maps/offline/14/8413/5385.png",
                    "maps/offline/14/8414/5383.png",
                    "maps/offline/14/8414/5384.png",
                    "maps/offline/14/8414/5385.png",
                    "maps/offline/14/8415/5383.png",
                    "maps/offline/14/8415/5384.png",
                    "maps/offline/14/8415/5385.png",
                    "maps/offline/14/8416/5383.png",
                    "maps/offline/14/8416/5384.png",
                    "maps/offline/14/8416/5385.png",
                    "maps/offline/15/16827/10766.png",
                    "maps/offline/15/16827/10767.png",
                    "maps/offline/15/16827/10768.png",
                    "maps/offline/15/16827/10769.png",
                    "maps/offline/15/16827/10770.png",
                    "maps/offline/15/16828/10766.png",
                    "maps/offline/15/16828/10767.png",
                    "maps/offline/15/16828/10768.png",
                    "maps/offline/15/16828/10769.png",
                    "maps/offline/15/16828/10770.png",
                    "maps/offline/15/16829/10766.png",
                    "maps/offline/15/16829/10767.png",
                    "maps/offline/15/16829/10768.png",
                    "maps/offline/15/16829/10769.png",
                    "maps/offline/15/16829/10770.png",
                    "maps/offline/15/16830/10766.png",
                    "maps/offline/15/16830/10767.png",
                    "maps/offline/15/16830/10768.png",
                    "maps/offline/15/16830/10769.png",
                    "maps/offline/15/16830/10770.png",
                    "maps/offline/15/16831/10766.png",
                    "maps/offline/15/16831/10767.png",
                    "maps/offline/15/16831/10768.png",
                    "maps/offline/15/16831/10769.png",
                    "maps/offline/15/16831/10770.png",
                    "maps/offline/15/16832/10766.png",
                    "maps/offline/15/16832/10767.png",
                    "maps/offline/15/16832/10768.png",
                    "maps/offline/15/16832/10769.png",
                    "maps/offline/15/16832/10770.png",
                ]
            );
        })
    );
});
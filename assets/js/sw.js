importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {

    workbox.routing.registerRoute(
        /\.js$/,
        // Use cache but update in the background.
        new workbox.strategies.StaleWhileRevalidate({
            // Use a custom cache name.
            cacheName: 'js-cache',
            plugins: [
                new workbox.broadcastUpdate.Plugin({
                    channelName: 'js-update',
                    deferNoticationTimeout: 20
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        // Cache CSS files.
        /\.css$/,
        // Use cache but update in the background.
        new workbox.strategies.StaleWhileRevalidate({
            // Use a custom cache name.
            cacheName: 'css-cache',
            plugins: [
                new workbox.broadcastUpdate.Plugin({
                    channelName: 'css-update',
                    deferNoticationTimeout: 20
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        // Use cache but update in the background.
        new workbox.strategies.StaleWhileRevalidate({
            // Use a custom cache name.
            cacheName: 'img-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ]
        })
    );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
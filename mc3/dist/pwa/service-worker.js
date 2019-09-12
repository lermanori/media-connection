importScripts("/precache-manifest.8fb2411cc93591e75001937d5ce7bd91.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
console.log(self)
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const title = 'media-connection';
  const options = {
    body: `${event.data.text()}`,
    badge: "/statics/icons/icon-128x128.png",
    icon: "/statics/icons/icon-128x128.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


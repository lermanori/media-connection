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

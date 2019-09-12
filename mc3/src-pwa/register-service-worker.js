/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import {
  register
} from 'register-service-worker'

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
}

register(process.env.SERVICE_WORKER_FILE, {
  ready(registration) {
    console.log('App is being served from cache by a service worker.');
  },
  registered(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Service worker has been registered.')

  },
  cached(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Content has been cached for offline use.')
  },
  updatefound(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is downloading.')
  },
  updated(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is available; please refresh.')
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(err) {
    console.error('Error during service worker registration:', err)
  },
  push() {
    console.log("push notification!")
  }
})

// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

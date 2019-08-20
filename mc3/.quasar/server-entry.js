/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'



import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeOut.css'


import 'quasar-styl'


import 'src/css/app.styl'


import createApp from './app.js'
import Vue from 'vue'



import pluginBootaxios from 'boot/axios'

import pluginBootcookies from 'boot/cookies'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, store, router } = createApp(context)

    
    const bootFiles = [pluginBootaxios,pluginBootcookies]
    for (let i = 0; i < bootFiles.length; i++) {
      try {
        await bootFiles[i]({
          app,
          router,
          store,
          Vue,
          ssrContext: context
        })
      }
      catch (err) {
        reject(err)
        return
      }
    }
    

    const
      { url } = context,
      { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
        .map(m => m.options /* Vue.extend() */ || m)

      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      

      context.state = store.state

      
      resolve(new Vue(app))
      

      
    }, reject)
  })
}

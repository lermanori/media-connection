// import something here
import VueCookies from 'vue-cookies'
// leave the export, even if you don't use it
export default async ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(VueCookies);
}

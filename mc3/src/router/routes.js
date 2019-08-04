import services from "../services";
import store from "../store"
const AuthMidlleware = (to, from, next) => {
  //console.log(this.$store)
  if (store().getters.loggedIn == false)
    next('/');
  else
    next();
};


const routes = [{
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Index.vue")
    }]
  },
  {
    path: "/register",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/register.vue")
    }]
  },
  {
    path: "/login",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/login.vue")
    }]
  },
  {
    path: "/grid",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/grid.vue")
    }]
  },
  {
    path: "/taskManager",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/taskManager.vue")
    }],
    beforeEnter: AuthMidlleware
  },

  {
    path: "/dashboard",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Dashboard.vue")
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/image-editor",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/ImageEditor.vue")
    }],
    //beforeEnter: AuthMidlleware
  },
  {
    path: "/group/:groupid",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/group.vue")
    }],
    beforeEnter: AuthMidlleware

  },
  {
    path: "/instagram",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/instagramRedirect.vue")
    }],
    //beforeEnter: AuthMidlleware

  },
  {
    path: "/requests",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/requests.vue")
    }],
    //beforeEnter: AuthMidlleware

  },

];


// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

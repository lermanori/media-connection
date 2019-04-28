import store from "../store";
import services from "../services";

const AuthMidlleware = (to, from, next) => {
    let user = services.auth();
    if (user == "")
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
  }
];


// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

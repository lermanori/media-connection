import services from "../services";
import store from "../store"
const AuthMidlleware = (to, from, next) => {
  //console.log(this.$store)
  if (store().getters["Users/loggedIn"] == false)
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
    path: "/:postid/image-editor",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/ImageEditorWithCard.vue")
    }],
    //beforeEnter: AuthMidlleware
  },

  {
    path: "/:postid/approval",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/approval.vue")
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
    beforeEnter: AuthMidlleware

  },
  {
    path: "/new-request",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/newRequest.vue")
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/requests",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/requests.vue")
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/post/requests",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: {
        //title: "new requests",
        filterFunc: x => x.status == "new request"
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/post/in-process",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: {
        //title: "In Process",
        filterFunc: x => x.status == "in process"
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/post/waiting-for-approval",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: {
        //  title: "Waiting For Approval",
        filterFunc: x => x.status == "waiting for approval",
        mode: "approval"
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/post/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: (route) => {
        return {
          //title: "post",
          filterFunc: x => x.id == route.params.id,
          mode: "approval"
        }
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/post",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: {
        //title: "Posts",
        filterFunc: x => x == x,
        mode: "all"
      }
    }],
    beforeEnter: AuthMidlleware
  },

  {
    path: "/friends/pending",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/pendingReqList.vue"),
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/friends",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/friendList.vue"),
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/groups/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/groups.vue"),
      props: (route) => {
        return {
          //title: "post",
          filterFunc: x => x._id == route.params.id,
          //mode: "approval"
        }
      }
    }],
    beforeEnter: AuthMidlleware

  },
  {
    path: "/groups",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/groups.vue"),
      props: {
        //title: "Posts",
        filterFunc: x => x == x,
        mode: "all"
      }
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

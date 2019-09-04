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
    path: "/group/:groupid/admin",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/groupAdmin.vue")
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
    path: "/:groupID/post/requests",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: (route) => {
        return {
          //title: "post",
          filterFunc: x => x.status == "new request" && x.groupID == route.params.groupID,
          mode: "approval"
        }
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
      props: (route) => {
        return {
          filterFunc: x => x.status == "in process" && x.groupID == route.params.groupID,
          mode: "approval"
        }
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
      props: (route) => {
        return {
          filterFunc: x => x.status == "waiting for approval" && x.groupID == route.params.groupID,
          mode: "approval"
        }
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
    path: "/post/commits/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/filterType.vue"),
      props: (route) => {
        return {
          //title: "post",
          filterFunc: x => {
            const commits = x.commits;
            const res = commits.find(x => x.user._id == route.params.id)
            return res;
          },
          mode: "all"
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
    path: "/profile/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/profile.vue"),
      props: (route) => {
        return {
          //title: "post",
          id: route.params.id,

        }
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/profile/email",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/profile.vue"),
      props: (route) => {
        return {
          //title: "post",
          id: route.query.email,
          mode: "email"
        }
      }
    }],
    beforeEnter: AuthMidlleware
  },
  {
    path: "/search",
    component: () => import("layouts/MyLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/search.vue"),

    }],
    beforeEnter: AuthMidlleware
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

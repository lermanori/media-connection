import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
  const Store = new Vuex.Store({
    state: {
      projectsArr: [],
      user: {
        loggedIn: false,
        userObj: {}
      }
    },
    getters: {
      projects: function (state) {
        return state.projectsArr;
      },
      loggedIn: function (state) {
        return state.user.loggedIn;
      },
    },
    mutations: {
      addProject(state, obj) {
        state.projectsArr.push(obj);
      },
      addEntry(state, obj) {
        state.projectsArr[obj.index].project_roadmap.push(obj.entry)
      },
      syncProjects(state, obj) {
        state.projectsArr = obj;
      },
      setAuthUser(state, user) {
        state.user.userObj = user;
        if (user != "")
          state.user.loggedIn = true;
        console.log('store get logged:' + state.user.loggedIn);
      },
      clearAuthUser(state) {
        state.user.userObj = {};
        state.user.loggedIn = false;
      }
    },
    actions: {
      addProject(context, obj) {
        return axios.post("api/projects", obj).then((response) => {
          console.log(response.data)
          context.commit('addProject', response.data);
        })
      },
      addEntry(context, obj) {
        let id = context.state.projectsArr[obj.index]._id;
        console.log(id);
        let url = `api/projects/${id}/entry`;
        axios.post(url, obj.entry).then((res) => {
          console.log(res);
          context.commit('addEntry', obj);
        });
      },
      syncProjects(context, obj) {
        let url = `api/projects/`;
        axios.get(url).then((data) => {
          context.commit('syncProjects', data.data)
        })
      },
      auth(context) {
        axios.get('/auth').then((data) => {
          context.commit('setAuthUser', data.data);
        })
      },
      clearAuth(context) {
        context.commit('clearAuthUser');
      }


    }


    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEV

  });

  return Store;
}

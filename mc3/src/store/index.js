import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import BaseURL from "../baseUrl";


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import {
  throws
} from "assert";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTbwaCrWR83nWoq3k0weeGk6K7pSEg2SY",
  authDomain: "media-connection-237114.firebaseapp.com",
  databaseURL: "https://media-connection-237114.firebaseio.com",
  projectId: "media-connection-237114",
  storageBucket: "media-connection-237114.appspot.com",
  messagingSenderId: "238147443037",
  appId: "1:238147443037:web:6f46fe9df3f7ecaf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const baseURL = BaseURL.localBaseUrl


Vue.use(Vuex);




/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
let myID = 0;
//new ido
const Store = new Vuex.Store({
  state: {
    id: myID++,
    projectsArr: [],
    user: {
      userObj: {},
      token: ""

    },
    authenticated: false
  },
  getters: {
    projects: function (state) {
      return state.projectsArr;
    },
    loggedIn: function (state) {
      return state.authenticated;
    },
    token: function (state) {
      return state.user.token;
    }


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
      if (user != null) {
        state.authenticated = true;
      }
      state.user.userObj = JSON.stringify(firebase.auth().currentUser);
      state.user.token = user.token;
    },
    clearAuthUser(state) {
      console.log("clearing user " + state.user.loggedIn);
      state.user.userObj = {};
      state.authenticated = false;
      console.log("clearing user " + state.user.loggedIn + " afater ");
    }
  },
  actions: {
    addProject(context, obj) {
      /* return axios.post(baseURL + "api/projects", obj).then((response) => {
         console.log(response.data)
       })*/
      context.commit('addProject', obj); //.data in axios
    },
    addEntry(context, obj) {
      /*
      let id = context.state.projectsArr[obj.index]._id;
      console.log(id);
      let url = `api/projects/${id}/entry`;
      axios.post(baseURL + url, obj.entry).then((res) => {
        console.log(res);
      });*/
      context.commit('addEntry', obj);
    },
    syncProjects(context, obj) {
      let url = `api/projects/`;
      axios.get(baseURL + url).then((data) => {
        context.commit('syncProjects', data.data)
      })
    },
    async signUpwWithEmailAndPass(context, obj) {
      try {
        const {
          user
        } = await firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password);
        const {
          data
        } = await axios.post(baseURL + '/auth/register', {
          "email": user.email,
          "uid": user.uid
        });
        const result = await axios.post(baseURL + '/auth/login', {
          "email": user.email,
          "uid": user.uid
        })
        const token = result.data.token;
        obj['token'] = token;
        context.commit('setAuthUser', obj);
      } catch (error) {
        console.log("Error SignIn" + error);
      }
    },
    async login(context, obj) {
      try {
        const data = await firebase.auth().signInWithEmailAndPassword(obj.email, obj.password);
        const result = await axios.post(baseURL + '/auth/login', {
          "email": data.user.email,
          "uid": data.user.uid
        })
        const token = result.data.token;
        data['token'] = token;
        context.commit('setAuthUser', data);
      } catch (error) {
        console.log("Error SignIn" + error);
      }

    },

    /// change to google  auth
    async auth(context) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        if (result.additionalUserInfo.isNewUser) {
          const {
            data
          } = await axios.post(baseURL + '/auth/register', {
            "email": user.email,
            "uid": user.uid
          });
        }
        const loginResult = await axios.post(baseURL + '/auth/login', {
          "email": user.email,
          "uid": user.uid
        })
        const token = loginResult.data.token;
        user['token'] = token;
        context.commit('setAuthUser', user);
        return result;
      } catch (error) {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
      }

    },
    reauth(context) {
      return firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          context.commit('setAuthUser', {
            username: user.displayName,
            email: user.email
          });

        }
      }).catch(function (error) {
        // Handle Errors here.
        console.log("error relogging in.")

        var errorCode = error.code;
        var errorMessage = error.message;
      });
    },
    clearAuth(context) {
      firebase.auth().signOut().then(() => {
        context.commit('clearAuthUser');
        console.log("sign out")
      }).catch(() => {
        console.log("error logging out.")
      })
    }



  },


  //enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV

});

export default function () {
  return Store;
}
//

// export default function ( /* { ssrContext } */ ) {
//   const Store = new Vuex.Store({
//     state: {
//       id: myID++,
//       projectsArr: [],
//       user: {
//         userObj: {}
//       },
//       authenticated: false
//     },
//     getters: {
//       projects: function (state) {
//         return state.projectsArr;
//       },
//       loggedIn: function (state) {
//         return state.authenticated;
//       }
//     },
//     mutations: {
//       addProject(state, obj) {
//         state.projectsArr.push(obj);
//       },
//       addEntry(state, obj) {
//         state.projectsArr[obj.index].project_roadmap.push(obj.entry)
//       },
//       syncProjects(state, obj) {
//         state.projectsArr = obj;
//       },
//       setAuthUser(state, user) {
//         if (user != null) {
//           state.authenticated = true;
//         }
//         state.user.userObj = JSON.stringify(firebase.auth().currentUser);
//       },
//       clearAuthUser(state) {
//         console.log("clearing user " + state.user.loggedIn);
//         state.user.userObj = {};
//         state.authenticated = false;
//         console.log("clearing user " + state.user.loggedIn + " afater ");
//       }
//     },
//     actions: {
//       addProject(context, obj) {
//         /* return axios.post(baseURL + "api/projects", obj).then((response) => {
//            console.log(response.data)
//          })*/
//         context.commit('addProject', obj); //.data in axios
//       },
//       addEntry(context, obj) {
//         /*
//         let id = context.state.projectsArr[obj.index]._id;
//         console.log(id);
//         let url = `api/projects/${id}/entry`;
//         axios.post(baseURL + url, obj.entry).then((res) => {
//           console.log(res);
//         });*/
//         context.commit('addEntry', obj);
//       },
//       syncProjects(context, obj) {
//         let url = `api/projects/`;
//         axios.get(baseURL + url).then((data) => {
//           context.commit('syncProjects', data.data)
//         })
//       },
//       signUpwWithEmailAndPass(context, obj) {
//         return firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((data) => {
//           context.commit('setAuthUser', data.user);
//         }).catch(function (error) {
//           console.log("Error SignIn" + error);
//         });
//       },
//       login(context, obj) {
//         return firebase.auth().signInWithEmailAndPassword(obj.email, obj.password).then((data) => {
//           context.commit('setAuthUser', data.user);
//         }).catch(function (error) {
//           console.log("Error SignIn" + error);
//         });

//       },

//       /// change to google  auth
//       async auth(context) {
//         try {
//           const result = await firebase.auth().signInWithPopup(provider);
//           // This gives you a Google Access Token.
//           // You can use it to access the Google API.
//           const token = result.credential.accessToken;
//           // The signed-in user info.
//           const user = result.user;
//           console.log(user);
//           context.commit('setAuthUser', user);
//           return result;
//         } catch (error) {
//           // Handle Errors here.
//           console.log(error);
//           var errorCode = error.code;
//           var errorMessage = error.message;
//         }

//       },
//       reauth(context) {
//         return firebase.auth().getRedirectResult().then(function (result) {
//           if (result.credential) {
//             // This gives you a Google Access Token.
//             // You can use it to access the Google API.
//             var token = result.credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             console.log(user);
//             context.commit('setAuthUser', {
//               username: user.displayName,
//               email: user.email
//             });

//           }
//         }).catch(function (error) {
//           // Handle Errors here.
//           console.log("error relogging in.")

//           var errorCode = error.code;
//           var errorMessage = error.message;
//         });
//       },
//       clearAuth(context) {
//         firebase.auth().signOut().then(() => {
//           context.commit('clearAuthUser');
//           console.log("sign out")
//         }).catch(() => {
//           console.log("error logging out.")
//         })
//       }



//     },


//     //enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEV

//   });

//   return Store;
// }

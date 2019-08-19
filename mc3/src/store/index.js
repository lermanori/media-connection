import Vue from "vue";
import Vuex from "vuex";

import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})





Vue.use(Vuex);




/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

//new ido
import Project from './Project'
import User from './User'
import Group from './Group'
import Post from './Post'
import Friend from './Friend'

const Store = new Vuex.Store({
  modules: {
    Project,
    User,
    Group,
    Post,
    Friend,
  },
  //enable strict mode (adds overhead!)
  // for dev mode only
  plugins: [vuexLocalStorage.plugin],
  strict: process.env.DEV

});

export default function () {
  return Store;
}

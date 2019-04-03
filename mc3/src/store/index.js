import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      projectsArr: [
        {
          project_name: "dummy project",
          project_person: "ori lerman",
          project_due_by: "tommorow",
          project_status: "ongoing",
          project_roadmap:[
            {title:'ori',date:'11/2',side:'right',color:'purple',icon:'add',description:'description 1'},
          ] 
        },
        {
          project_name: "dummy project 2",
          project_person: "dani karol",
          project_due_by: "2 weeks",
          project_status: "done",
          project_roadmap:[
            {title:'ori kkkk',date:'1188/2',side:'left',color:'green',icon:'add',description:'description 2'},
          ] 
        }
      ]
    },
    getters: {
      projects: function(state) {
        return state.projectsArr;
      }
    },
    mutations: {
      addProject(state, obj) {
        state.projectsArr.push(obj);
        console.log("added Project");
      },
      addEntry(state, obj){
        state.projectsArr[obj.index].project_roadmap.push(obj.entry)
        console.log("added Entry");
      },
      syncProjects(state,obj){
        console.log(obj);
        state.projectsArr = obj;
        console.log(state.projectsArr);
      }
    },
    actions:{
      addProject(context,obj){
        axios.post("/projects",obj).then(()=>{context.commit('addProject',obj)})
      },
      addEntry(context,obj){
        let url = `/projects/${obj.index}`;
        console.log(url);
        axios.post(url,obj).then(()=>{context.commit('addEntry',obj)})
      },
      syncProjects(context,obj){
        let url = `/projects/`;
        axios.get(url).then((data)=>{context.commit('syncProjects',data.data)})
      }

      
    }
  
  
    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEV

  });

  return Store;
}

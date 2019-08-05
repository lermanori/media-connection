import axios from "axios";
import BaseURL from "../../baseUrl";



export function addProject(context, obj) {
  /* return axios.post(baseURL + "api/projects", obj).then((response) => {
     console.log(response.data)
   })*/
  context.commit('addProject', obj);
} //.data in axios
export function addEntry(context, obj) {
  /*
  let id = context.state.projectsArr[obj.index]._id;
  console.log(id);
  let url = `api/projects/${id}/entry`;
  axios.post(baseURL + url, obj.entry).then((res) => {
    console.log(res);
  });*/
  context.commit('addEntry', obj);
}
export function
syncProjects(context, obj) {
  let url = BaseURL.localBaseUrl +`/api/projects/`;
  axios.get(url).then((data) => {
    context.commit('syncProjects', data.data)
  })
}



export function addProject(state, obj) {
    state.projectsArr.push(obj);
  }
 export function addEntry(state, obj) {
    state.projectsArr[obj.index].project_roadmap.push(obj.entry)
  }
  export function syncProjects(state, obj) {
    state.projectsArr = obj;
  }

import axios from "axios";
//import axiosConfig from "../../axiosConfig"
import baseUrl from "../../baseUrl";
import store from "../../store";

const newAxioxConfig = () => {
  return {
    headers: {
      Authorization: "bearer " + store().getters['User/token']
    }
  }
}


export async function createPost(context, filterdProperties) {
  try {
    //     const result = await axios.post(baseUrl.localBaseUrl+"/api/post/create",filterdProperties);
    const conf = newAxioxConfig();
    console.log(conf)
    const result = await axios.post(baseUrl.localBaseUrl + "/api/post/create", {groupID:store().getters["Group/currentGroupID"],filterdProperties}, conf);

    if (result) {
      context.commit('createPost', filterdProperties)
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}

// headers: {
//   Authorization:"bearer " + store().getters['User/token']
// }
// };

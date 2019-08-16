import axios from "axios";
import {
  axiosConfig
} from "../../axiosConfig"
import baseUrl from "../../baseUrl";
import store from "../../store";
import postConverter from "../../mixins/PostConverter"

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
    console.log(conf);
    const dataObj = {
      groupID: store().getters["Group/currentGroupID"],
      filterdProperties,
      status: "new request"
    }
    const res = await axios.post(baseUrl.localBaseUrl + "/api/post/create", dataObj, conf);
    console.log(res);
    const data = {
      groupID: res.data.group,
      filterdProperties: res.data.properties,
      status: res.data.status,
      id: res.data._id
    }
    console.log(data);
    context.commit('createPost', data)

  } catch (err) {
    console.log(err);
  }
}
export async function addImageToPost(context, imageData) {
  try {
    const conf = newAxioxConfig();
    const result = await axios.post(baseUrl.localBaseUrl + "/api/post/commit", imageData, conf);
    const res = result.data;
    const postToAdd = {
      filterdProperties: res.properties,
      groupID: res.group,
      id: res._id,
      status: res.status,
      commits: res.commits,
    }
    context.commit('addImageToPost', postToAdd);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
export async function getCommits(context, postId) {
  try {
    const conf = newAxioxConfig();
    const res = await axios.get(baseUrl.localBaseUrl + `/api/post/${postId}/commit`, conf);
    return res;
  } catch (err) {
    console.log(err)
  }
}
export async function syncPosts(context, groupId) {
  try {
    const conf = newAxioxConfig();
    const res = await axios.get(baseUrl.localBaseUrl + `/api/group/${groupId}/posts`, conf);
    const posts = res.data;
    const postsData = posts.map(x => {
      return postConverter.convertIdToPost(x);
    });
    return Promise.all(postsData).then((
      data
    ) => {
      const resData = data.map(x => x.data);
      const posts = resData.map(res => {
        return {
          filterdProperties: res.properties,
          groupID: res.group,
          id: res._id,
          status: res.status,
          commits: res.commits,
        }
      });
      context.commit('setPosts', posts);
      return posts;
    })
  } catch (err) {
    console.log(err)
  }
}



// headers: {
//   Authorization:"bearer " + store().getters['User/token']
// }
// };

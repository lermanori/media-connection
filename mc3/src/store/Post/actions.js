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
    const data = {
      groupID: res.data.group,
      filterdProperties: res.data.properties,
      status: res.data.status,
      id: res.data._id
    }
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
export async function approvePost(context, postData) {
  try {
    console.log("approve post:--")
    let message = postData.message;
    let path = postData.value;
    const conf = newAxioxConfig();
    const result = await axios.post(baseUrl.localBaseUrl + `/api/post/${postData.postId}/approve`, {
      message,
      path
    }, conf);
    context.commit('approvePost', result.data)
    return result;
  } catch (err) {
    console.log(err);
  }
}
export async function disapprovePost(context, postData) {
  try {
    console.log("disapprove post:--")
    let message = postData.message;
    const conf = newAxioxConfig();
    const result = await axios.post(baseUrl.localBaseUrl + `/api/post/${postData.postId}/disapprove`, {
      message
    }, conf);
    context.commit('approvePost', result.data)
    return result;
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
///very bad method. use get all posts instead.
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
          path: res.approvedPath
        }
      });
      context.commit('setPosts', posts);
      return posts;
    })
  } catch (err) {
    console.log(err)
  }
}

export async function getAllPosts(context) {
  const conf = newAxioxConfig();
  const posts = await axios.get(baseUrl.localBaseUrl + `/api/post`, conf);
  const postsMapped = posts.data.map(res => {
    return {
      filterdProperties: res.properties,
      groupID: res.group,
      id: res._id,
      status: res.status,
      commits: res.commits,
      path: res.approvedPath
    }
  })
  context.commit('setPosts', postsMapped);
  return postsMapped;
}



// headers: {
//   Authorization:"bearer " + store().getters['User/token']
// }
// };

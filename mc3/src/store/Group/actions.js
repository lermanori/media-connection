import axios from "axios";
import axiosConfig from "../../axiosConfig"
import baseUrl from "../../baseUrl";
import store from "../../store";
import postConverter from "../../mixins/PostConverter"

export function setGroupID(context, obj) {
  console.log(obj);
  context.commit('setGroupID', obj);
}
export async function syncGroups(context) {
  const conf = axiosConfig.axiosConfig();
  const Url = `${baseUrl.localBaseUrl}/api/group`
  const res = await axios.get(Url, conf);
  context.commit('setGroups', res.data);
  return res.data;
  //tbi instead of group and connection
}
export async function addGroup(context, group) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/group/create";
  const res = await axios.post(URL, group, conf);
  return res.data;
  //tbi instead of group and connection
}
export async function deleteGroup(context, groupId) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/group/" + groupId + "/delete";
  const res = await axios.delete(URL, conf);
  return res;
  //tbi instead of group and connection
}
export async function removeUser(context, obj) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/group/" + obj.groupId + '/' + obj.friendshipId + "/user/delete";
  const res = await axios.delete(URL, conf);
  return res;
  //tbi instead of group and connection
}

export async function removePost(context, obj) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/post/" + obj.postId;
  let URL2 = baseUrl.localBaseUrl + "/api/group/" + obj.groupId + '/' + obj.postId + '/post/delete';
  const res1 = await axios.delete(URL2, conf);
  const res = await axios.delete(URL, conf);
  return {
    res,
    res1
  };
  //tbi instead of group and connection
}

///

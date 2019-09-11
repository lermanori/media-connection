import axios from "axios";
import axiosConfig from "../../axiosConfig"
import baseUrl from "../../baseUrl";
import store from "../../store";
import postConverter from "../../mixins/PostConverter"

export function setGroupID(context, obj) {
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
export async function updatePermissions(context, obj) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/group/permissions";
  const res = await axios.put(URL, obj, conf);
  return res;
}
export async function getDefaultPermissions(context, groupId) {
  const conf = axiosConfig.axiosConfig();
  let URL = baseUrl.localBaseUrl + "/api/group/permissions/" + groupId;
  const res = await axios.get(URL, conf);
  return res;
}
export async function setDefaultPermissions(context, obj) {
  const conf = axiosConfig.axiosConfig();
  console.log(obj);
  let URL = baseUrl.localBaseUrl + "/api/group/permissions/" + obj.groupId;
  const res = await axios.post(URL, obj.defaultPermissions, conf);
  console.log(res)
  return res;


}

///

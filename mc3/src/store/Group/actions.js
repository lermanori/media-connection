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

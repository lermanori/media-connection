import axios from "axios";
import BaseURL from "../../baseUrl";
import firebase from '../firebase_init'
import axiosConfig from '../../axiosConfig'
const baseURL = BaseURL.localBaseUrl


export async function add(context, email) {
  console.log("in AddFriend: Email", email);
  const res = axios.post(BaseURL.localBaseUrl + '/api/friend/add', {
    email
  }, axiosConfig.axiosConfig());
  return res;
};

export async function approve(context, user) {
  console.log("in approve Friend: user-", user);
  const res = axios.post(BaseURL.localBaseUrl + '/api/friend/approve', {
    approvedUserId: user._id
  }, axiosConfig.axiosConfig());
  return res;
};

export async function syncPending(context, filter) {
  const res = await axios.get(BaseURL.localBaseUrl + '/api/friend', axiosConfig.axiosConfig());
  const pending = await context.dispatch(
    "transformIdToUsers",
    filter(res)
  );
  return pending.data.result;
};

export async function transformIdToUsers(context, idArr) {
  const res = await axios.post(BaseURL.localBaseUrl + '/api/friend/users', {
    users: idArr
  }, axiosConfig.axiosConfig());
  return res;
};

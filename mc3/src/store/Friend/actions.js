import axios from "axios";
import BaseURL from "../../baseUrl";
import firebase from '../firebase_init'
import axiosConfig from '../../axiosConfig'
const baseURL = BaseURL.localBaseUrl


export async function add(context, email) {
  const res = axios.post(BaseURL.localBaseUrl + '/api/friend/add', {
    email
  }, axiosConfig.axiosConfig());
  return res;
};

export async function approve(context, user) {
  const res = axios.post(BaseURL.localBaseUrl + '/api/friend/approve', {
    approvedUserId: user._id
  }, axiosConfig.axiosConfig());
  return res;
};


export async function syncByFilter(context, filter) {
  const res = await axios.get(BaseURL.localBaseUrl + '/api/friend', axiosConfig.axiosConfig());
  const sync = await context.dispatch(
    "transformIdToUsers",
    filter(res)
  );
  return sync.data.result;
};
export async function syncPending(context) {
  const res = await context.dispatch('syncByFilter', res => res.data.user.pendingReq)
  context.commit('setPending', res);
  return res;
};
export async function syncSent(context) {
  const res = await context.dispatch('syncByFilter', res => res.data.user.sentReq)
  context.commit('setSent', res);
  return res;
};
export async function syncFriends(context) {
  const res = await context.dispatch('syncByFilter', res => res.data.user.friendsList)
  context.commit('setFriends', res);
  return res;
};

export async function transformIdToUsers(context, idArr) {
  const res = await axios.post(BaseURL.localBaseUrl + '/api/friend/users', {
    users: idArr
  }, axiosConfig.axiosConfig());
  return res;
};
export async function transformUidToUsers(context, uidArr) {
  const res = await axios.post(BaseURL.localBaseUrl + '/api/friend/users/uid', {
    users: uidArr
  }, axiosConfig.axiosConfig());
  return res;
};
export async function addFriendToGroup(context, item) {
  const res = await axios.post(BaseURL.localBaseUrl + '/api/friend/addToGroup', item, axiosConfig.axiosConfig())
  return res.data;
};

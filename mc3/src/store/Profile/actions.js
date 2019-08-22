import axios from "axios";
import BaseURL from "../../baseUrl";
import axiosConfig from '../../axiosConfig'


export async function get(context, id) {
  const res = axios.get(BaseURL.localBaseUrl + '/api/profile/' + id, axiosConfig.axiosConfig());
  console.log(res);
  return res;
};
export async function create(context) {
  const res = axios.post(BaseURL.localBaseUrl + '/api/profile/', {}, axiosConfig.axiosConfig());
  console.log(res);
  return res;
};
export async function update(context, payload) {
  const res = axios.put(BaseURL.localBaseUrl + '/api/profile/', payload, axiosConfig.axiosConfig());
  console.log(res);
  return res;
};

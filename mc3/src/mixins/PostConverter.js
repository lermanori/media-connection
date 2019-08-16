import axios from 'axios'
import axiosConfig from '../axiosConfig'
import baseUrl from '../baseUrl'


export default {
  async convertIdToPost(id) {
    const config = axiosConfig.axiosConfig();
    const post = axios.get(baseUrl.localBaseUrl + '/api/post/' + id, config);
    return post;
  }
}

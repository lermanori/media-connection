import store from './store'
export default {
  axiosConfig: () => {
    return {
      headers: {
        Authorization: "bearer " + store().getters['User/token']
      }
    }
  }
};

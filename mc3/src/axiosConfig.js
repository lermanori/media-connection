import store from './store'
export default {
  headers: {
    Authorization:"bearer " + store().getters['User/token']
  }
};

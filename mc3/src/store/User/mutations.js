import firebase from '../firebase_init'

export function setAuthUser(state, user) {
  if (user != null) {
    state.authenticated = true;
  }
  state.user.userObj = JSON.stringify(firebase.auth().currentUser);
  state.user.token = user.token;
  state.user.id = user.id;

}
export function clearAuthUser(state) {
  state.user.userObj = {};
  state.user.token = "";
  state.user.id = "";
  state.authenticated = false;
}
export function setInstagramToken(state, token) {
  state.user.instagram_token = token;
}

export function loggedIn(state) {
  return state.authenticated;
}
export function token(state) {
  return state.user.token;
}
export function id(state) {
  return state.user.id;
}
export function instagram_token(state) {
  return state.user.instagram_token;
}

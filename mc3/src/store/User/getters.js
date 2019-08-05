
export function loggedIn(state) {
  return state.authenticated;
}
export function token(state) {
  return state.user.token;
}
export function instagram_token(state) {
  return state.user.instagram_token;
}


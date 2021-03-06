export function createPost(state, filterdProperties) {
  const posts = state.posts
  state.posts = [...posts, filterdProperties]
}
export function addImageToPost(state, postData) {
  const posts = state.posts

  const filter = posts.filter(x => x.id != postData.id);
  console.log(postData)
  state.posts = [...filter, postData]
}
export function setPosts(state, posts) {
  state.posts = posts;
}
export function approvePost(state, post) {
  const posts = state.posts
  const filter = posts.filter(x => x.id != post.id);
  console.log(post)
  state.posts = [...filter, post]
}

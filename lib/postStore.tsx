export type Post = {
  id: string;
  uri: string;
  username?: string;
  location?: string;
  caption?: string;
};

let POSTS: Post[] = [];

export function setPosts(posts: Post[]) {
  POSTS = posts;
}

export function getPosts() {
  return POSTS;
}
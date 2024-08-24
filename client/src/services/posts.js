// services/posts.js
import { makeRequest } from "./makeRequest";

export async function getPosts() {
  const posts = await makeRequest("/posts");
  
  return posts;
}

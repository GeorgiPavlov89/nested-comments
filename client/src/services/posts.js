
import { makeRequest } from "./makeRequest";

export async function getPosts() {
  try {
    const posts = await makeRequest("/posts");
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}


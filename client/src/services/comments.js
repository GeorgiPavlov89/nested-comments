import { makeRequest } from "./makeRequest";

export function createComment({
  postId,
  content,
  parentId,
  imageUrl,
  newUsername,
  score,
}) {
  return makeRequest("/posts", {
    method: "POST",
    data: { content, parentId, postId, newUsername, imageUrl, score },
  });
}

export function deleteComment(commentId) {
  return makeRequest(`posts/${commentId}`, {
    method: "DELETE",
  });
}

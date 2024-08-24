import { makeRequest } from "./makeRequest";

export function createComment({
  postId,
  content,
  parentId,
  imageUrl,
  newUsername,
  score,
  replies
}) {
  return makeRequest("/posts", {
    method: "POST",
    data: { content, parentId, postId, newUsername, imageUrl, score , replies},
  });
}

export function deleteComment(commentId) {
  return makeRequest(`posts/${commentId}`, {
    method: "DELETE",
  });
}

export function editComment(commentId, newContent) {
  return makeRequest(`posts/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ newContent})
  })
}
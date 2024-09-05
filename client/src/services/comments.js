import { makeRequest } from './makeRequest'; 

export function createComment({
  postId,
  content,
  parentId,
  imageUrl,
  newUsername,
  score,
  replies,
}) {
  return makeRequest("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      content,
      parentId,
      postId,
      username: newUsername,
      imageUrl,
      score,
      replies
    },
  });
}


export function deleteComment(commentId) {
  return makeRequest(`posts/${commentId}`, {
    method: "DELETE",
  });
}

export function editComment(commentId, editedContent) {
  return makeRequest(`posts/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: { content: editedContent },
  });
}

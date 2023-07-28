import SingleComment from "./SingleComment";
import { useState } from "react";
import { useComment } from "../context/CommentContext";
import AddComment from "./AddComment";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";
import { deleteComment } from "../services/comments";

function PostLists() {
  const { comments, setComments } = useComment();
  const [content, setContent] = useState("");
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  function onCommentCreate(content) {
    if (!content) {
      return;
    }

    const newCommentData = {
      content,
      postId: comments._id,
      score: 0,
      newUsername: "juliusomo",
      imageUrl: "./images/avatars/image-juliusomo.webp",
    };

    createCommentFn(newCommentData).then((response) => {
      const newComment = response.comment;
      setComments((prevComments) => [newComment, ...prevComments]);
    });
  }

  function onCommentDelete(commentId) {
    deleteComment(commentId)
      .then((response) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  }

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <SingleComment
            key={comment._id}
            commentId={comment._id}
            content={comment.content}
            createdAt={comment.createdAt}
            username={comment.username}
            userimg={comment.imageUrl}
            score={comment.score}
            replies={comment.replies}
            handleDelete={onCommentDelete}
          />
        ))}
      <AddComment error={error} content={content} onSubmit={onCommentCreate} />
    </>
  );
}

export default PostLists;

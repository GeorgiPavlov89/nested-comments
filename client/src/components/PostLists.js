import SingleComment from "./SingleComment";
import {useEffect, useState } from "react";
import { useComment } from "../context/CommentContext";
import AddComment from "./AddComment";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";
import { deleteComment } from "../services/comments";
import { editComment } from "../services/comments";

function PostLists() {
  const { comments, setComments } = useComment();
  const [content, setContent] = useState("");
  
 
  
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

 
  const sortedComments = [...comments].sort((a, b) => b.score - a.score)

  
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
  
    createComment(newCommentData)
      .then((response) => {
        if (response && response.content) {
          setComments((prevComments) => [...prevComments, response]);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  }
  
  function onCommentEdit(updatedComment) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
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
  function handleScoreUpdate(commentId, newScore) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, score: newScore } : comment
      )
    );
  }
  
  return (
    <>
     {sortedComments &&
  sortedComments.map((comment) => {
    
    return (
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
        handleEdit={onCommentEdit}
        handleScoreUpdate={handleScoreUpdate}
      />
    );
  })}
      <AddComment error={error} content={content} onSubmit={onCommentCreate} newUsername="juliusomo" />
    </>
  );
}

export default PostLists;

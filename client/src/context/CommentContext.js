import React, { createContext, useContext, useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getPosts()
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  
    fetchComments();
  }, []);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
}

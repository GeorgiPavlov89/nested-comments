import React, { createContext, useContext, useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setComments(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
}

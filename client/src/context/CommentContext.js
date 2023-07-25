import React, { useContext } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";

const Context = React.createContext();

export function useComment() {
  return useContext(Context);
}

export function CommentProvider({ children }) {
  const { loading, error, value: post } = useAsync(() => getPosts());
  console.log(post);
  return (
    <Context.Provider
      value={{
        post,
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}

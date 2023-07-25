import SingleComment from "./SingleComment";

import { useComment } from "../context/CommentContext";

function PostLists() {
  const { post } = useComment();

  return (
    <>
      {post &&
        post.map((p) => (
          <SingleComment
            key={p._id}
            content={p.content}
            createdAt={p.createdAt}
            username={p.username}
            userimg={p.imageUrl}
            score={p.score}
            replies={p.replies}
          />
        ))}
    </>
  );
}

export default PostLists;

import React from "react";
import Replay from "./Replay";
import {

  MDBCol,
 
  MDBRow,
 
} from "mdb-react-ui-kit";
function ReplayContainer({ replies }) {
  return (
    <MDBRow className="p-3">
      <div className="collapse-line"></div>
      <MDBCol>
        {replies &&
          replies.map((replay) => {
            return (
              <MDBRow className="py-2" key={replay.id}>
                <Replay
                  content={replay.content}
                  createdAt={replay.createdAt}
                  score={replay.score}
                  username={replay.username}
                  userImg={replay.imageUrl}
                  replyingTo={replay.replyingTo}
                />
              </MDBRow>
            );
          })}
      </MDBCol>
    </MDBRow>
  );
}

export default ReplayContainer;

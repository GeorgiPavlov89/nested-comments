import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";
import ReplayContainer from "./ReplayContainer";
import { deleteComment } from "../services/comments";
import { editComment } from "../services/comments";
import AddComment from "./AddComment";


const dateFormater = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
function SingleComment({
  commentId,
  content,
  username,
  createdAt,
  userimg,
  replies,
  score,
  handleDelete,
  handleEdit,
  handleScoreUpdate
  
}) {
  
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isReplying, setIsReplying] = useState(false)

  function replyHandler() {
    setIsReplying(true)
  }
  function deleteCommentHandler(e) {
    deleteComment(commentId)
      .then(() => {
        handleDelete(commentId);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  }

  function editCommentHandler(e) {
    e.preventDefault();
  
    editComment(commentId, editedContent)
      .then((updatedComment) => {
        handleEdit(updatedComment);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error while editing:", error);
      });
  }
  
  function onIncrement () {
    handleScoreUpdate( commentId,score + 1)
  }
  
  function onDecrement () {
    if (!score == 0) {

      handleScoreUpdate( commentId,score - 1)
    }

  }
  return (
    <>
      <section className="gradient-custom">
        <MDBContainer className="py-3" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol>
                      <div className="d-flex mb-3">
                        <MDBCardImage
                          className="rounded-circle shadow-1-strong me-3"
                          src={userimg}
                          alt="avatar"
                          width="35"
                          height="35"
                        />
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="fw-bold m-0">
                            {username}{" "}
                            <span className="small m-3 fw-light">
                              {dateFormater.format(Date.parse(createdAt))}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex flex-start">
                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            {isEditing ? (
                              <div data-mdb-input-init className="form-outline mb-4">
                              <textarea className="form-control" id="textAreaExample6" rows="3"
                                value={editedContent}
                                onChange={(e) =>
                                  setEditedContent(e.target.value)
                                }
                              />
                              
                            </div>
                                
                            
                            ) : (
                              <p className="small mb-0">{content}</p>
                            )}
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center square bg-light rounded-5">
                              <MDBBtn
                                  onClick={onIncrement}
                                  className="mx-2"
                                  color="tertiary"
                                  rippleColor="light"
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                      fill="#C5C6EF"
                                    />
                                  </svg>
                                </MDBBtn>
                                <span
                                  style={{ color: "#5357B6" }}
                                  className="fw-bold"
                                >
                                  {score}
                                </span>
                                <MDBBtn
                                  onClick={onDecrement}
                                  className="mx-2"
                                  color="tertiary"
                                  rippleColor="light"
                                >
                                  <svg
                                    width="11"
                                    height="3"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                      fill="#C5C6EF"
                                    />
                                  </svg>
                                </MDBBtn>
                              </div>
                              {username === "juliusomo" ? (
                                <div
                                  style={{
                                    gap: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    onClick={deleteCommentHandler}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                             <svg
                                      type="button"
                                      width="12"
                                      height="12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                        fill="#ED6368"
                                      />
                                    </svg>
                                    <span
                                      type="button"
                                      style={{ color: "red" }}
                                      className="small fw-bold"
                                    >
                                      {" "}
                                      Delete
                                    </span>
                                  </div>
                                  {isEditing ? (
                                    <div
                                      onClick={editCommentHandler}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <span
                                        type="button"
                                        style={{ color: "#5357B6" }}
                                        className="small fw-bold"
                                      >
                                        Save
                                      </span>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setIsEditing(true)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <svg
                                      width="12"
                                      height="12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                                        fill="#5357B6"
                                      />
                                    </svg>
                                    <span
                                      type="button"
                                      style={{ color: "#5357B6" }}
                                      className="small fw-bold"
                                    >
                                      {" "}
                                      Edit
                                    </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div 
                                onClick={replyHandler}
                                type="button">
                                <svg
                                  width="14"
                                  height="13"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                    fill="#5357B6"
                                  />
                                </svg>
                                <span className="small fw-bold" style={{color:"#5357B6"}}> Reply</span>
                              </div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      {isReplying ? <AddComment isReplying={isReplying} setIsReplying={setIsReplying}/> : ""}
      {replies?.length > 0 && (
        <MDBContainer className="py-3 d-flex " style={{ maxWidth: "670px" }}>
          <ReplayContainer replies={replies} />
        </MDBContainer>
      )}
    </>
  );
}

export default SingleComment;

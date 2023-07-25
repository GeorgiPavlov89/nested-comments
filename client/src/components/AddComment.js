import { useState, useEffect, useContext } from "react";
import { ComentContext } from "../App";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
function AddComment({ user, addNewComment }) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("juliusomo");
  const [createdAt, setCreatedAt] = useState("1 hour ago");
  const [score, setScore] = useState(0);
  // const comment = useContext(ComentContext);

  async function handleSubmitComment(e) {
    e.preventDefault();

    const data = {
      content: content,
      username: username,
      createdAt: createdAt,
      score: score,
    };

    const response = await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Fetch the updated list of comments
    const responseData = await response.json();

    // Update the comments state in the parent component (App.js)
    addNewComment(responseData);

    setContent("");
    setUsername("");
    setCreatedAt("");
    setScore(0);
  }

  return (
    <form>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }} type="form">
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBCard>
              <MDBCardFooter className="py-3 border-0">
                <div className="d-flex flex-start w-100">
                  <MDBTextArea
                    type="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    label="Add Comment"
                    id="textAreaExample"
                    rows={3}
                    style={{ backgroundColor: "#fff" }}
                    wrapperClass="w-100"
                  />
                </div>
                <div className="float-end mt-2 pt-1 d-flex w-100 justify-content-between">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="./images/avatars/image-juliusomo.webp"
                    alt="avatar"
                    width="40"
                    height="40"
                  />

                  <MDBBtn
                    size="sm"
                    className="me-1"
                    onClick={handleSubmitComment}
                  >
                    SEND
                  </MDBBtn>
                </div>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default AddComment;

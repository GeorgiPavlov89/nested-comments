import { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

function AddComment({
  setIsReplying,
  isReplying,
  onSubmit,
  imageUrl,
  score,
  autoFocus = false,
  newUsername,
  initialValue = "",
}) {
  const [inputContent, setInputContent] = useState(initialValue);

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (inputContent.trim() === "") {
      return;
    }
  
    onSubmit(inputContent.trim(), score, newUsername, imageUrl);
    setInputContent("");
  }

  function handleCloseReply(e) {
    e.preventDefault()
    setIsReplying(false)
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }} type="form">
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBCard>
              <MDBCardFooter className="py-3 border-0">
                <div className="d-flex flex-start w-100">
                  <MDBTextArea
                    type="content"
                    autoFocus={autoFocus}
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    label={isReplying ? "Add Reply" : "Add Comment"}
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
                  <div>
                    {isReplying  ? <MDBBtn size="sm" className="me-1" color="danger" onClick={handleCloseReply}>
                    CANCEL</MDBBtn>
                  : ""}
                   <MDBBtn size="sm" className="me-1" type="submit">
                    SEND
                  </MDBBtn>
                  
                  </div>
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

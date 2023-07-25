import { useEffect, useState, createContext } from "react";
import SingleComment from "./components/SingleComment";

import "./App.css";

import AddComment from "./components/AddComment";
import PostLists from "./components/PostLists";
import { CommentProvider } from "./context/CommentContext";

export const ComentContext = createContext();
function App() {
  // const [data, setData] = useState([]);
  // const [user, setUser] = useState({});
  // console.log(user.username);
  // useEffect(() => {
  //   fetch("http://localhost:4000/users").then((response) => {
  //     response.json().then((responseData) => {
  //       setUser(responseData);
  //       console.log(responseData.username);
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/posts").then((response) => {
  //     response.json().then((data) => {
  //       setData(data);
  //     });
  //   });
  // }, []);

  // const addNewComment = (comment) => {
  //   setData((prevData) => [...prevData, comment]);
  // };

  return (
    <div className="App">
      <CommentProvider>
        <PostLists />
        <AddComment />
      </CommentProvider>
    </div>
  );
}

export default App;

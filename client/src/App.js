import "./App.css";
import PostLists from "./components/PostLists";
import { CommentProvider } from "./context/CommentContext";

function App() {
  return (
    <div className="App">
      <CommentProvider>
        <PostLists />
      </CommentProvider>
    </div>
  );
}

export default App;

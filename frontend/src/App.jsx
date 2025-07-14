import "./App.css";
import { Route } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={ChatPage} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;

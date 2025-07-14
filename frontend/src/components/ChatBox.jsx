import { Card } from "react-bootstrap";
import SingleChat from "./SingleChat";
import { ChatState } from "../context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const displayStyle =
    window.innerWidth < 768 ? (selectedChat ? "flex" : "none") : "flex";
  return (
    <Card
      style={{
        display: displayStyle,
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        padding: "12px",
        backgroundColor: "white",
        borderRadius: "12px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#dee2e6",
        height: "100%",
        width: "100%",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Card>
  );
};

export default ChatBox;

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Stack, Spinner, Alert } from "react-bootstrap";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Plus } from "react-bootstrap-icons";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const [error, setError] = useState("");

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      setError("Failed to load chats.");
    }
  };
  console.log("Chats component loaded!");

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px",
        backgroundColor: "white",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "12px",
        border: "1px solid #dee2e6",
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          paddingBottom: "12px",
          paddingLeft: "12px",
          paddingRight: "12px",
          fontSize: "28px",
          fontFamily: "Work Sans",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
        <GroupChatModal>
          <Button
            style={{
              display: "flex",
              fontSize: "17px",
              alignItems: "center",
            }}
          >
            New Group Chat <Plus style={{ marginLeft: "6px" }} />
          </Button>
        </GroupChatModal>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          overflowY: "hidden",
        }}
      >
        {error && (
          <Alert variant="danger" style={{ fontSize: "14px" }}>
            {error}
          </Alert>
        )}
        {chats ? (
          <div
            style={{
              overflowY: "scroll",
              height: "100%",
            }}
          >
            <Stack gap={2}>
              {chats.map((chat) => (
                <Card
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                    color: selectedChat === chat ? "white" : "black",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>
                  {chat.latestMessage && (
                    <div style={{ fontSize: "12px" }}>
                      <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </div>
                  )}
                </Card>
              ))}
            </Stack>
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </Card>
  );
};

export default MyChats;

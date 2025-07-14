import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Container, Row } from "react-bootstrap";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {user && <SideDrawer />}

      <Container
        fluid
        style={{
          height: "calc(100vh - 70px)",
          padding: "10px",
        }}
      >
        <Row
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "15px",
          }}
        >
          {user && (
            <>
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MyChats fetchAgain={fetchAgain} />
              </div>

              <div
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;

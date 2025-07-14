import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getSender } from "../../config/ChatLogics";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [show, setShow] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Error occurred! Failed to load search results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setShow(false);
    } catch (error) {
      alert("Error fetching the chat: " + error.message);
    }
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-between align-items-center bg-white p-2 border"
      >
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Search Users to chat</Tooltip>}
        >
          <Button variant="outline-secondary" onClick={() => setShow(true)}>
            <i className="fas fa-search"></i>{" "}
            <span className="d-none d-md-inline px-2">Search User</span>
          </Button>
        </OverlayTrigger>

        <h2 style={{ fontFamily: "Work sans" }}>Talk-A-Tive</h2>

        <div className="d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-notif">
              <Badge bg="danger">{notification.length}</Badge>{" "}
              <i className="fas fa-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {notification.length === 0 && (
                <Dropdown.ItemText>No New Messages</Dropdown.ItemText>
              )}
              {notification.map((notif) => (
                <Dropdown.Item
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle variant="light" id="dropdown-avatar">
              <img
                src={user.pic}
                alt={user.name}
                className="rounded-circle"
                width={30}
                height={30}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ProfileModal user={user}>
                <Dropdown.Item>My Profile</Dropdown.Item>
              </ProfileModal>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
              Go
            </Button>
          </InputGroup>

          {loading ? (
            <ChatLoading />
          ) : (
            searchResult.map((u) => (
              <UserListItem
                key={u._id}
                user={u}
                handleFunction={() => accessChat(u._id)}
              />
            ))
          )}

          {loadingChat && (
            <div className="d-flex justify-content-center mt-2">
              <Spinner animation="border" />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideDrawer;

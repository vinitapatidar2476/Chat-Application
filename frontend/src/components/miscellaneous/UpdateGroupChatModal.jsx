import { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Spinner,
  InputGroup,
  FormControl,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { AiOutlineEye } from "react-icons/ai";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // ✅ Modal show/hide state
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      showToastMessage("Failed to Load the Search Results", "error");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      showToastMessage("Group Name Updated", "success");
    } catch (error) {
      showToastMessage(error.response.data.message, "error");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      showToastMessage("User Already in group!", "error");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      showToastMessage("Only admins can add someone!", "error");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      showToastMessage(error.response.data.message, "error");
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      showToastMessage("Only admins can remove someone!", "error");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      showToastMessage(error.response.data.message, "error");
      setLoading(false);
    }
    setGroupChatName("");
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Button variant="link" onClick={() => setShowModal(true)}>
        <AiOutlineEye />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              paddingBottom: "20px",
            }}
          >
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>

          <Form>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={handleRename}
                disabled={renameloading}
              >
                {renameloading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Update"
                )}
              </Button>
            </InputGroup>

            <FormControl
              placeholder="Add User to group"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="mb-3"
            />

            {loading ? (
              <Spinner animation="border" size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </Modal.Footer>
      </Modal>

      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastType === "success" ? "success" : "danger"}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            minWidth: "200px",
          }}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default UpdateGroupChatModal;

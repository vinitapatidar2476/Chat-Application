import { useState } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { FaEye } from "react-icons/fa"; // ViewIcon alternative
import IconButton from "react-bootstrap/Button"; // using Button as icon button

const ProfileModal = ({ user, children }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {children ? (
        <span onClick={handleShow} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <IconButton variant="light" onClick={handleShow} className="d-flex">
          <FaEye />
        </IconButton>
      )}

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "40px",
              fontFamily: "Work sans",
              width: "100%",
              textAlign: "center",
            }}
          >
            {user.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column align-items-center justify-content-between"
          style={{ height: "270px" }}
        >
          <Image
            roundedCircle
            src={user.pic}
            alt={user.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <p
            style={{
              fontSize: "30px",
              fontFamily: "Work sans",
              marginTop: "15px",
            }}
          >
            Email: {user.email}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;

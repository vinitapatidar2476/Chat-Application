import { Card, Row, Col, Image } from "react-bootstrap";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Card
      onClick={handleFunction}
      className="mb-2"
      style={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        borderRadius: "8px",
        padding: "6px 10px",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#38B2AC";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#E8E8E8";
        e.currentTarget.style.color = "black";
      }}
    >
      <Row className="align-items-center g-2">
        <Col xs="auto">
          <Image
            src={user.pic}
            roundedCircle
            width={36}
            height={36}
            alt={user.name}
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col>
          <div style={{ fontSize: "14px", fontWeight: "500" }}>{user.name}</div>
          <div style={{ fontSize: "11px" }}>
            <strong>Email:</strong> {user.email}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default UserListItem;

import { Badge, CloseButton } from "react-bootstrap";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      pill
      style={{
        color: "white",
        backgroundColor: "purple",
        padding: "4px 8px",
        margin: "4px",
        fontSize: "12px",
        borderRadius: "0.75rem",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
      }}
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseButton
        style={{ marginLeft: "6px", fontSize: "10px" }}
        onClick={handleFunction}
      />
    </Badge>
  );
};

export default UserBadgeItem;

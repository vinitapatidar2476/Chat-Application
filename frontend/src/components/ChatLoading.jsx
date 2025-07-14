import React from "react";
import { Placeholder, Stack } from "react-bootstrap";

const ChatLoading = () => {
  const skeletonCount = 12;

  return (
    <Stack gap={2}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Placeholder key={index} animation="glow">
          <Placeholder
            xs={12}
            style={{ height: "45px", display: "block", borderRadius: "5px" }}
          />
        </Placeholder>
      ))}
    </Stack>
  );
};

export default ChatLoading;

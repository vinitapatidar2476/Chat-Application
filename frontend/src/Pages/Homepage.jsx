import React, { useEffect } from "react";
import { Container, Tab, Tabs, Card } from "react-bootstrap";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
  return (
    <div>
      <Container
        fluid
        className="d-flex flex-column align-items-center"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Card
          className="w-100 text-center mb-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            marginTop: "30px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <h2 className="mb-0">Talk-A-Tive</h2>
          </Card.Body>
        </Card>

        <Card
          className="w-100"
          style={{
            maxWidth: "500px",
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
            minHeight: "380px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <Tabs defaultActiveKey="login" className="mb-3" fill>
              <Tab eventKey="login" title="Login">
                <Login />
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <Signup />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Homepage;

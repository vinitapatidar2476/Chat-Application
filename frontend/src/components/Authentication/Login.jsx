import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl as RBFormControl,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: "" });

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      setAlert({ msg: "Please fill all the fields", variant: "warning" });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      setAlert({ msg: "Login successful", variant: "success" });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.error("Login error:", error.response || error);
      setAlert({
        msg: error.response?.data?.message || "Login failed. Try again!",
        variant: "danger",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Form style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {alert.msg && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ msg: "", variant: "" })}
            dismissible
          >
            {alert.msg}
          </Alert>
        )}

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <RBFormControl
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <RBFormControl
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="outline-secondary" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button
          variant="primary"
          onClick={submitHandler}
          style={{ width: "100%", marginTop: "15px" }}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>

        <Button
          variant="danger"
          className="w-100"
          type="button"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </Form>
    </div>
  );
};

export default Login;

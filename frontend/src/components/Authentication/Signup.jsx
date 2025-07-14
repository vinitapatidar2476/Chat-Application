import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl as RBFormControl,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: "" });

  const submitHandler = async () => {
    setPicLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      setAlert({ msg: "Please fill all the fields", variant: "warning" });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      setAlert({ msg: "Passwords do not match", variant: "danger" });
      setPicLoading(false);
      return;
    }

    if (!pic) {
      setAlert({
        msg: "Please wait until the picture uploads",
        variant: "warning",
      });
      setPicLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      setAlert({ msg: "Registration successful", variant: "success" });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
      console.log("Submitting form...");
      console.log("Payload:", { name, email, password, pic });
    } catch (error) {
      setAlert({
        msg: error.response?.data?.message || "Error occurred",
        variant: "danger",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);

    if (!pics) {
      toast.warning("Please Select an Image!", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setPicLoading(false);
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dukqnhkst");

      fetch("https://api.cloudinary.com/v1_1/dukqnhkst/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Upload Failed. Try Again!", {
            position: "bottom-center",
            autoClose: 5000,
          });
          setPicLoading(false);
        });
    } else {
      toast.warning("Please Select a JPEG or PNG image!", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setPicLoading(false);
    }
  };

  return (
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

      <Form.Group controlId="first-name">
        <Form.Label>Name</Form.Label>
        <RBFormControl
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

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

      <Form.Group controlId="confirm-password">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <RBFormControl
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
          <Button variant="outline-secondary" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="pic">
        <Form.Label>Upload your Picture</Form.Label>
        <RBFormControl
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </Form.Group>

      <Button
        variant="primary"
        style={{ marginTop: 15, width: "100%" }}
        onClick={submitHandler}
        disabled={picLoading || !pic} // disabled if pic still uploading
      >
        {picLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
      </Button>
    </Form>
  );
};

export default Signup;

import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import NavbarComponent from "../google-drive/NavbarComponent";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatepassword, updatemail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updatemail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatepassword(passwordRef.current.value));
    }
    if (promises.length !== 0) {
      Promise.all(promises)
        .then(() => {
          console.log("updated");
          navigate("/user");
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to Update");
        })
        .finally(() => {
          setLoading(false);
        });
    }else{
        alert("No value changes");
        navigate("/user");
    }
  }
  return (
    <>
    <NavbarComponent/>
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="mb-4 text-center">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep it same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep it same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
    </>
  );
}

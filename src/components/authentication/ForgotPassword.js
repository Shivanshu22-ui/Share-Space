import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    await resetPassword(emailRef.current.value)
      .then((result) => {
        setError("");
        setLoading(true);
        alert('Check your email')
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to reset password");
      });
  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="mb-4 text-center">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign-up</Link>
      </div>
    </CenteredContainer>
  );
}

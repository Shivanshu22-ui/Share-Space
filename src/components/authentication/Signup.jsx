import React ,{useRef, useState}from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"
import {useAuth} from '../../context/AuthContext'
import { Link ,useNavigate} from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate ();

    async function handleSubmit(e){
      e.preventDefault();
      if(passwordConfirmRef.current.value !== passwordRef.current.value){
        return setError("Passwords do not match")
      }
        await signup(emailRef.current.value, passwordRef.current.value).then((result) => {
          setError('');
          setLoading(true);
          navigate("/")
        }).catch((err) => {
          console.log(err);
          setError('Failed to sign up')
        });

    }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="mb-4 text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" required ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">Sign-Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </CenteredContainer>
  );
}

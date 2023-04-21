import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import CenteredContainer from "./CenteredContainer";

export default function DashBoard() {
    const [error,setError] = useState('');
    const {currentUser,logout} = useAuth();
    const navigate = useNavigate();

    if(!currentUser){
        return <Navigate replace to="/login"/>;
    }

    async function handleLogout(e){
        e.preventDefault()
        await logout().then(()=>{
            alert('logged out')
            console.log(currentUser);
            navigate("/login");
        }).catch((err)=>{
            setError(err);
        })
    }
  return (
    <CenteredContainer>
        <Card>
            <Card.Body>
            <h2 className="mb-4 text-center">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to="/update-profile" className='btn btn-primary w-100 mt-4'>Update Profile</Link>
            </Card.Body>
        </Card>
      <div className="w-100 text-center mt-2">
        <Button variant='link' onClick={handleLogout}>Log out</Button>
      </div>
    </CenteredContainer>
  )
}

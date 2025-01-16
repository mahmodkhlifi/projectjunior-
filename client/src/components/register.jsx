import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();  // <-- Use the hook inside the component

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hzezz rzgisrze");
    // Make API call to create a new user
    axios.post("http://localhost:2200/api/user/add", {
      username,
      password

    })
    .then((response) => {
      setSuccess("User registered successfully!");
      setError(""); // Clear error message if successful
      navigate("/list");  // Redirect to login page after successful registration
    })
    .catch((error) => {
      if (error.response) {
        setError(error.response.data.message);
        setSuccess(""); // Clear success message if an error occurs
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;

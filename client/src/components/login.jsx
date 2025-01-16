import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2200/api/user/login", { username, password })
      .then((response) => {
        console.log("Response", response);
        navigate("/list"); 
      })
      .catch((error) => {
    
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/signup")}>Create a new user</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

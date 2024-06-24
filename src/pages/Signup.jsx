import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Signup.css';

function Signup() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData); // Example: Log form data to console
  };

  return (
    <Container className="signup-container ">
      <Row>
        <Col md={12}>
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='text-center'>User Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Student"
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === 'student'}
                  onChange={() => setUserType('student')}
                />
                <Form.Check
                  inline
                  label="College"
                  type="radio"
                  name="userType"
                  value="college"
                  checked={userType === 'college'}
                  onChange={() => setUserType('college')}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formUsername" className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;

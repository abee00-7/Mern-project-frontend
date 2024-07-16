import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup, FormControl, Alert, FormLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import allapi from '../services/allApi';
import loginimg from '../assets/login.png'
import './Signup.css'; // Import CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!username || !email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const userData = { username, email, password, userType };
      const response = await allapi.signup(userData);
      console.log('Signup successful:', response);

      localStorage.setItem('token', response.token);

      toast.success(`Signed up as ${userType} successfully!`, {
        onClose: () => navigate('/login'),
        autoClose: 2000,
        position: "top-center"
      });
    } catch (error) {
      toast.error('Username or Email already exist', error);
   
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <Container className="signup-content w-75 ">
        <Row className="justify-content-center">
          <Col md={6} className="text-center mb-4">
            <img src={loginimg} alt="Signup Image" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div className="signup-form-container">
              <h2 className='fw-bolder text-center'>Signup</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignup}>
                <FormGroup controlId="formUsername">
                  <FormControl
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-input"
                  />
                </FormGroup>

                <FormGroup controlId="formEmail">
                  <FormControl
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-input mt-3"
                  />
                </FormGroup>

                <FormGroup controlId="formPassword">
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-input mt-3"
                  />
                </FormGroup>

                <FormGroup controlId="formUserType" className="mt-3">
                  <FormLabel>User Type</FormLabel>
                  <FormControl as="select" value={userType} onChange={(e) => setUserType(e.target.value)} className="text-input">
                    <option value="student">Student</option>
                    <option value="college">College</option>
                  </FormControl>
                </FormGroup>

                <div className="text-center">
                  <Button className='w-75 btn btn-success mt-4' type="submit">
                    Signup
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <span>Already registered? </span>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Signup;

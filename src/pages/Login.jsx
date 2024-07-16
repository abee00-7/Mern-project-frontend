import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup, FormControl, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import CSS file
import allapi from '../services/allApi'; // Import allapi for API calls
import loginimg from '../assets/login.png'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const credentials = { email, password };
      // Call login function from allapi or your API service
      const response = await allapi.login(credentials);
      console.log('Login successful:', response);

      localStorage.setItem('token', response.token);

      toast.success(`Logged in successfully as ${response.user.userType}!`, {
        autoClose: 3000,
        position: "top-center",
        onClose: () => {
          if (response.user.userType === 'student') {
            navigate('/student-dashboard');
          } else if (response.user.userType === 'college') {
            navigate('/college-dashboard');
          } else if (response.user.userType === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/'); 
          }
        }
      });
    } catch (error) {
      toast.error('invalid Email or Password :', error);
      
    }
  }

  return (
    
    <div className="login-container d-flex align-items-center justify-content-center">
      
      <Container className="login-content w-75">
        <Row className="justify-content-center ">
          <Col md={6} className="text-center mb-4">
          
            <img src={loginimg} alt="Login Image" className="img-fluid" />
          </Col>
          <Col md={6}>
          <h2 className='fw-bolder text-center'>Login</h2>
            <div className="login-form-container">
           
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <FormGroup controlId="formEmail">
                  <FormControl
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-input"
                  />
                </FormGroup>

                <FormGroup controlId="formPassword">
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-input"
                  />
                </FormGroup>

                <div className="text-center">
                  <Button className='w-75 btn btn-success mt-4' type="submit">
                    Login
                  </Button>
                </div>

                <div className="mt-3 text-center">
                  <span>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </span>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        
      </Container>
      
      

      <ToastContainer />
    </div>
  );
}

export default Login;

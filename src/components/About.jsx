import React from 'react';
import { Container, Row, Col,Navbar,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/clogo.png'
import './About.css';

function About() {
  return (
    
   <div>
      <Navbar bg="light" variant="light" expand="lg" >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo} // Replace with the path to your logo image
              width="50"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/colleges">Colleges</Nav.Link>
              <Nav.Link as={Link} to="/About">About</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="about-container">
      
        <Row>
          <Col>
            <h2 className='text-warning'>About Us</h2>
            <p>
              Welcome to our Career  Theory platform. Our mission is to provide students with the resources and guidance they need to make informed decisions about their education and career paths. We connect students with colleges and provide tools to assess their skills and match them with appropriate institutions.
            </p>
            <p>
             <h4 className='text-danger'>Our platform offers:</h4>
              <ul>
                <li>Comprehensive aptitude tests to evaluate student skills.</li>
                <li>Detailed profiles for colleges, including available courses and cutoff marks.</li>
                <li>Personalized recommendations based on student performance and preferences.</li>
              </ul>
            </p>
            <p>
              Join us today to take the next step in your educational journey.
            </p>
          </Col>
        </Row>
      </Container>
   </div>
  );
}

export default About;

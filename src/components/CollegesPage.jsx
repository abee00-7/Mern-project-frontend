import React from 'react';
import './CollegesPage.css';
import { Container, Row, Col,Navbar,Nav,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/clogo.png'

const colleges = [
  { id: 1, name: 'College A', location: 'Location A', description: 'Description A' },
  { id: 2, name: 'College B', location: 'Location B', description: 'Description B' },
  { id: 3, name: 'College C', location: 'Location C', description: 'Description C' },
  // Add more colleges as needed
];

function CollegesPage() {
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
      <Container className="colleges-page mt-5 pt-5">
        <h2 className="text-center mb-4 fw-bolder text-warning">Registered Colleges</h2>
        <Row>
          {colleges.map((college) => (
            <Col key={college.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{college.name}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {college.location}
                    <br />
                    <strong>Description:</strong> {college.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
 </div>
  );
}

export default CollegesPage;

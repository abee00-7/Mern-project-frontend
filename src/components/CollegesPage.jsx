import React, { useState, useEffect } from 'react';
import './CollegesPage.css';
import { Container, Row, Col, Navbar, Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/clogo.png';
import allapi from '../services/allApi'; // Import the API function
function CollegesPage() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchCollegesData();
  }, []);

  const fetchCollegesData = async () => {
    try {
      const data = await allapi.fetchRegisteredColleges();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching registered colleges:', error);
    }
  };

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="50"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
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
            <Col key={college._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{college.fullname}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {college.location}
                    <br />
                    {/* Assuming courses is an array */}
                    <strong>Courses:</strong> {college.courses.join(', ')}
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

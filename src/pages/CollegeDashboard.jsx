import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import allapi from '../services/allApi';
import './CollegeDashboard.css'; // Import CSS file

function CollegeDashboard() {
  const [profile, setProfile] = useState({});
  const [profileUpdateData, setProfileUpdateData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadProfile(token);
    } else {
      navigate('/login');
    }
  }, []);

  const loadProfile = async (token) => {
    try {
      const profileData = await allapi.getCollegeProfile(token);
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to load profile:', error);
      setError('Failed to load profile. Please try again.');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedProfile = await allapi.updateCollegeProfile(token, profileUpdateData);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully!', {
        autoClose: 3000,
        position: "top-center"
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Container fluid className="college-dashboard">
      <Row>
        <Col md={3} className="sidebar">
          <Card className="sidebar-card">
            <Card.Body>
              <Card.Title>Options</Card.Title>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className="nav-link active">Profile</button>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} className="main-content">
          <div className="main-header">
            <h2 className="main-heading">College Dashboard</h2>
            <div className="logout">
              <Button variant="link" onClick={handleLogout}>
                Logout <i class="fa-solid fa-right-from-bracket"></i>
              </Button>
            </div>
          </div>
          <div className="main-window">
            {profile && (
              <div>
                <h3>Profile</h3>
                <Form onSubmit={handleProfileUpdate}>
                  <Form.Group controlId="formFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={profileUpdateData.fullname || profile.fullname}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, fullname: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={profileUpdateData.email || profile.email}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Location"
                      value={profileUpdateData.location || profile.location}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, location: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Description"
                      value={profileUpdateData.description || profile.description}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, description: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCourses">
                    <Form.Label>Courses</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Courses"
                      value={profileUpdateData.courses || profile.courses}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, courses: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCutoffMark">
                    <Form.Label>Cutoff Mark</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Cutoff Mark"
                      value={profileUpdateData.cutoffmark || profile.cutoffmark}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, cutoffmark: e.target.value })}
                    />
                  </Form.Group>
                  <Button type="submit">Update Profile</Button>
                </Form>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default CollegeDashboard;

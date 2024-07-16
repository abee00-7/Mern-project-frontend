import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import allapi from '../services/allApi';
import './StudentDashboard.css'; // Import CSS file

function StudentDashboard() {
  const [profile, setProfile] = useState({});
  const [profileUpdateData, setProfileUpdateData] = useState({});
  const [testQuestions, setTestQuestions] = useState(null); // Initialize as null
  const [testAnswers, setTestAnswers] = useState({});
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]); // State for filtered colleges
  const [testScore, setTestScore] = useState(null);
  const [error, setError] = useState('');
  const [testSubmitted, setTestSubmitted] = useState(false); // State to track test submission
  const [selectedOption, setSelectedOption] = useState('profile');
  const [selectedCollege, setSelectedCollege] = useState(null); // State for selected college details
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadProfileData(token);
      fetchColleges();
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    // Filter colleges whenever testScore or colleges array changes
    filterCollegesByTestScore();
  }, [testScore, colleges]);

  const fetchColleges = async () => {
    try {
      const data = await allapi.getAllColleges();
      setColleges(data);
      console.log('Colleges fetched:', data); // Debugging log
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const loadProfileData = async (token) => {
    try {
      const profileData = await allapi.getProfile(token);
      setProfile(profileData);
      setProfileUpdateData({
        fullname: profileData.fullname,
        email: profileData.email,
        location: profileData.location,
        phonenumber: profileData.phonenumber,
      });

      console.log('Profile data loaded:', profileData); // Debugging log

      if (profileData.testScore !== undefined && profileData.testScore !== null) {
        setTestScore(profileData.testScore);
        loadCollegesByMarks(token);
      } else {
        loadTestQuestions(token);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setError('Failed to load profile. Please try again.');
    }
  };

  const loadTestQuestions = async (token) => {
    try {
      const questions = await allapi.fetchTestQuestions(token);
      setTestQuestions(questions);
      console.log('Test questions loaded:', questions); // Debugging log
    } catch (error) {
      console.error('Failed to fetch test questions:', error);
      setError('Failed to fetch test questions. Please try again.');
    }
  };

  const loadCollegesByMarks = async (token) => {
    try {
      const data = await allapi.getCollegesByMarks(token);
      setFilteredColleges(data);
      console.log('Colleges by marks loaded:', data); // Debugging log
    } catch (error) {
      console.error('Failed to load colleges by marks:', error);
      setError('Failed to load colleges by marks. Please try again.');
    }
  };

  const filterCollegesByTestScore = () => {
    if (testScore !== null) {
      const filtered = colleges.filter(college => college.cutoffmark <= testScore);
      setFilteredColleges(filtered);
      console.log('Filtered colleges:', filtered); // Debugging log
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setTestAnswers({
      ...testAnswers,
      [questionId]: answer,
    });
  };

  const handleTestSubmission = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const testAnswersData = Object.keys(testAnswers).map((questionId) => ({
        questionId,
        answer: testAnswers[questionId],
      }));

      const response = await allapi.submitTestAnswers(token, testAnswersData);
      setTestScore(response.score);
      toast.success(`Test submitted successfully! Your score: ${response.score}`, {
        autoClose: 5000,
        position: "top-center"
      });

      localStorage.setItem('testScore', response.score);
      setProfile({
        ...profile,
        testScore: response.score,
      });

      loadCollegesByMarks(token);
      setTestSubmitted(true);
    } catch (error) {
      console.error('Failed to submit test:', error);
      setError('Failed to submit test. Please try again.');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedProfile = await allapi.updateProfile(token, profileUpdateData);
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
    localStorage.removeItem('testScore');
    navigate('/');
  };

  const viewCollegeDetails = (collegeId) => {
    const selected = colleges.find(college => college._id === collegeId);
    setSelectedCollege(selected);
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="student-dashboard">
      <Row>
        <Col md={3} className="sidebar">
          <Card className="sidebar-card">
            <Card.Body>
              <Card.Title>Options</Card.Title>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className={`nav-link ${selectedOption === 'profile' ? 'active' : ''}`} onClick={() => setSelectedOption('profile')}>Profile</button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${selectedOption === 'aptitudeTest' ? 'active' : ''}`} onClick={() => setSelectedOption('aptitudeTest')}>Aptitude Test</button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${selectedOption === 'colleges' ? 'active' : ''}`} onClick={() => setSelectedOption('colleges')}>View Colleges</button>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} className="main-content">
          <div className="main-header">
            <h2 className="main-heading">Student Dashboard</h2>
            <div className="logout">
              <Button variant="link" onClick={handleLogout}>
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </Button>
            </div>
          </div>
          <div className="main-window">
            {selectedOption === 'profile' && (
              <div>
                <h3>Update Profile</h3>
                <Form onSubmit={handleProfileUpdate}>
                  <Form.Group controlId="formFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={profileUpdateData.fullname || profile.fullname}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, fullname: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={profileUpdateData.email || profile.email}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, email: e.target.value })}
                      required
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
                  <Form.Group controlId="formPhonenumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      value={profileUpdateData.phonenumber || profile.phonenumber}
                      onChange={(e) => setProfileUpdateData({ ...profileUpdateData, phonenumber: e.target.value })}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </Form>
              </div>
            )}
            {selectedOption === 'aptitudeTest' && testScore === null && (
              <div>
                <h3>Aptitude Test</h3>
                <Form onSubmit={handleTestSubmission}>
                  {testQuestions && testQuestions.length > 0 ? (
                    testQuestions.map((question, index) => (
                      <div key={question._id}>
                        <h4>{question.question}</h4>
                        {question.options.map((option, idx) => (
                          <Form.Check
                            key={option}
                            type="radio"
                            label={option}
                            name={`question-${question._id}`}
                            id={`question-${question._id}-option-${idx}`}
                            onChange={() => handleAnswerChange(question._id, option)}
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>Loading questions...</p>
                  )}
                  <Button variant="primary" type="submit">Submit Test</Button>
                </Form>
              </div>
            )}
            {selectedOption === 'aptitudeTest' && testScore !== null && testScore !== 0 && (
              <div>
                <h3>Test Score</h3>
                <p>Your score: {testScore}</p>
              </div>
            )}
            {selectedOption === 'colleges' && (
              <div>
                <h3>Colleges by Marks</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Courses</th>
                      <th>Cutoff Mark</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.map(college => (
                      <tr key={college._id}>
                        <td>{college.fullname}</td>
                        <td>{college.email}</td>
                        <td>{college.location}</td>
                        <td>{college.courses}</td>
                        <td>{college.cutoffmark}</td>
                        <td>
                          <Button variant="primary" onClick={() => viewCollegeDetails(college._id)}>View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Col>
      </Row>

    
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>College Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCollege && (
            <div>
              <h5>{selectedCollege.fullname}</h5>
           
              <p><strong>Description:</strong> {selectedCollege.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

     
      <ToastContainer />

    </Container>
  );
}

export default StudentDashboard;

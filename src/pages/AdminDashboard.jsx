import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import allapi from '../services/allApi';
import './AdminDashboard.css'; // Import CSS file

const AdminDashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('colleges');
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
    fetchStudents();
    fetchQuestions();
  }, []);

  const fetchColleges = async () => {
    try {
      const data = await allapi.getAllColleges();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await allapi.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await allapi.getAllQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    
    // Construct the new question object
    const newQuestion = {
      question: question,
      options: options,
      answer: answer,
    };

    try {
      await allapi.addQuestion(newQuestion);
      toast.success('Question added successfully!');
      fetchQuestions(); // Fetch updated questions after adding
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question. Please try again.');
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await allapi.deleteQuestion(id);
      toast.success('Question deleted successfully!');
      fetchQuestions(); // Fetch updated questions after deletion
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question. Please try again.');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await allapi.deleteStudent(id);
      toast.success('Student deleted successfully!');
      fetchStudents(); // Fetch updated student list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student. Please try again.');
    }
  };

  const handleDeleteCollege = async (id) => {
    try {
      await allapi.deleteCollege(id);
      toast.success('College deleted successfully!');
      fetchColleges(); // Fetch updated college list after deletion
    } catch (error) {
      console.error('Error deleting college:', error);
      toast.error('Failed to delete college. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Container fluid className="admin-dashboard">
      <Row>
        <Col md={3} className="sidebar">
          <Card className="sidebar-card">
            <Card.Body>
              <Card.Title>Options</Card.Title>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setSelectedOption('colleges')}>View Colleges</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setSelectedOption('students')}>View Students</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setSelectedOption('questions')}>Manage Questions</button>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} className="main-content">
          <h2 className="main-heading">Admin Dashboard</h2>
          <div className="logout" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div>
          <div className="main-window">
            {selectedOption === 'colleges' && (
              <div>
                <h3>Registered Colleges</h3>
                {colleges.length === 0 ? (
                  <span  className='text-danger fw-bolder fs-4'>No colleges registered yet.</span>
                ) : (
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
                      {colleges.map(college => (
                        <tr key={college._id}>
                          <td>{college.fullname}</td>
                          <td>{college.email}</td>
                          <td>{college.location}</td>
                          <td>{college.courses.join(', ')}</td>
                          <td>{college.cutoffmark}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleDeleteCollege(college._id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            )}
            {selectedOption === 'students' && (
              <div>
                <h3>Registered Students</h3>
                {students.length === 0 ? (
                  <span  className='text-danger fw-bolder fs-4'>No students registered yet.</span>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student._id}>
                          <td>{student.fullname}</td>
                          <td>{student.email}</td>
                          <td>{student.location}</td>
                          <td>{student.phonenumber}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleDeleteStudent(student._id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            )}
            {selectedOption === 'questions' && (
              <div>
                <h3>Manage Questions</h3>
                <Form onSubmit={handleAddQuestion}>
                  <FormGroup controlId="formQuestion">
                    <FormControl
                      type="text"
                      placeholder="Enter question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </FormGroup>
                  {options.map((option, index) => (
                    <FormGroup key={index} controlId={`formOption${index}`}>
                      <FormControl
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          setOptions(newOptions);
                        }}
                        required
                      />
                    </FormGroup>
                  ))}
                  <FormGroup controlId="formCorrectOption">
                    <FormControl
                      type="text"
                      placeholder="Correct option"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button type="submit">Add Question</Button>
                </Form>
                <h4>Existing Questions</h4>
                {questions.length === 0 ? (
                  <span className='text-danger fw-bolder fs-4'>No questions added yet.</span>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map(q => (
                        <tr key={q._id}>
                          <td>{q.question}</td>
                          <td>{q.options.join(', ')}</td>
                          <td>{q.answer}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleDeleteQuestion(q._id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminDashboard;

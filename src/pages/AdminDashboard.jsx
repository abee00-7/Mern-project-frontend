import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('viewColleges'); // Default selected option
  const [questions, setQuestions] = useState([
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin'], answer: 'Paris' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newAnswer, setNewAnswer] = useState('');

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAddQuestion = () => {
    const newId = questions.length ? questions[questions.length - 1].id + 1 : 1;
    setQuestions([...questions, { id: newId, question: newQuestion, options: newOptions, answer: newAnswer }]);
    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setNewAnswer('');
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const handleLogout = () => {
    // Implement the logout functionality here
    // For example, clear the auth tokens, session, etc.
    console.log('Logged out');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className={selectedOption === 'viewColleges' ? 'active' : ''} onClick={() => handleOptionSelect('viewColleges')}>
            View Colleges
          </li>
          <li className={selectedOption === 'viewStudents' ? 'active' : ''} onClick={() => handleOptionSelect('viewStudents')}>
            View Students
          </li>
          <li className={selectedOption === 'addQuestion' ? 'active' : ''} onClick={() => handleOptionSelect('addQuestion')}>
            Add Question
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Admin Dashboard</h2>
          <a href="#" className="logout-link" onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i> </a>
        </div>
        {selectedOption === 'viewColleges' && (
          <div>
            <h3>Registered Colleges</h3>
            {/* Fetch and display list of registered colleges */}
            <ul>
              <li>College A</li>
              <li>College B</li>
              <li>College C</li>
            </ul>
          </div>
        )}
        {selectedOption === 'viewStudents' && (
          <div>
            <h3>Registered Students</h3>
            {/* Fetch and display list of registered students */}
            <ul>
              <li>Student 1</li>
              <li>Student 2</li>
              <li>Student 3</li>
            </ul>
          </div>
        )}
        {selectedOption === 'addQuestion' && (
          <div>
            <h3>Add Question</h3>
            <div>
              <label>Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter question"
                required
              />
            </div>
            {newOptions.map((option, index) => (
              <div key={index}>
                <label>Option {index + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <div>
              <label>Answer</label>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter answer"
                required
              />
            </div>
            <button onClick={handleAddQuestion}>Add Question</button>
            <h3>Existing Questions</h3>
            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  <strong>{question.question}</strong>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  Answer: {question.answer}
                  <button className='ms-2 btn btn-danger' onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

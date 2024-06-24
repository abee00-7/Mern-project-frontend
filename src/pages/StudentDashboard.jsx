import React, { useState } from 'react';
import './StudentDashboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [selectedOption, setSelectedOption] = useState('profile'); // Default selected option
  const [profile, setProfile] = useState({
    fullname: '',
    email: '',
    gender: '',
    place: '',
    qualification: '',
  });
  const [aptitudeAnswers, setAptitudeAnswers] = useState({});
  const [marks, setMarks] = useState(null);
  const [colleges, setColleges] = useState([
    { name: 'College A', cutoff: 75 },
    { name: 'College B', cutoff: 85 },
    { name: 'College C', cutoff: 65 },
  ]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAptitudeChange = (questionId, answer) => {
    setAptitudeAnswers({ ...aptitudeAnswers, [questionId]: answer });
  };
  const navigate = useNavigate();
  const calculateMarks = () => {
    // Dummy calculation
    const correctAnswers = Object.values(aptitudeAnswers).filter(answer => answer === 'correct').length;
    setMarks(correctAnswers * 10); // Assuming each question is worth 10 marks
  };
  const handleLogout = () => {
  
    console.log('Logged out');
    navigate('/');
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className={selectedOption === 'profile' ? 'active' : ''} onClick={() => handleOptionSelect('profile')}>
            Profile
          </li>
          <li className={selectedOption === 'aptitude' ? 'active' : ''} onClick={() => handleOptionSelect('aptitude')}>
            Aptitude Test
          </li>
          <li className={selectedOption === 'viewColleges' ? 'active' : ''} onClick={() => handleOptionSelect('viewColleges')}>
            View Colleges by Marks
          </li>
        </ul>
      </div>
      <div className="main-content">
    
        <div className="header">
          <h2>Admin Dashboard</h2>
          <a href="#" className="logout-link" onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i> </a>
        </div>
        {selectedOption === 'profile' && (
          <div>
            <h3>Student Profile</h3>
            <form>
              <div>
                <label>Full Name</label>
                <input type="text" name="fullname" value={profile.fullname} onChange={handleProfileChange} placeholder="Enter your full name" required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Enter email" required />
              </div>
              <div>
                <label>Gender</label>
                <select name="gender" value={profile.gender} onChange={handleProfileChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label>Place</label>
                <input type="text" name="place" value={profile.place} onChange={handleProfileChange} placeholder="Enter your place" required />
              </div>
              <div>
                <label>Last Qualification</label>
                <input type="text" name="qualification" value={profile.qualification} onChange={handleProfileChange} placeholder="Enter your last qualification" required />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        )}
        {selectedOption === 'aptitude' && (
          <div>
            <h3>Aptitude Test</h3>
            <form>
              <div>
                <label>Question 1: What is 2 + 2?</label>
                <div>
                  <input type="radio" name="q1" value="correct" onChange={() => handleAptitudeChange('q1', 'correct')} /> 4
                </div>
                <div>
                  <input type="radio" name="q1" value="wrong" onChange={() => handleAptitudeChange('q1', 'wrong')} /> 5
                </div>
              </div>
              <div>
                <label>Question 2: What is the capital of France?</label>
                <div>
                  <input type="radio" name="q2" value="correct" onChange={() => handleAptitudeChange('q2', 'correct')} /> Paris
                </div>
                <div>
                  <input type="radio" name="q2" value="wrong" onChange={() => handleAptitudeChange('q2', 'wrong')} /> London
                </div>
              </div>
              <button type="button" onClick={calculateMarks}>Submit Test</button>
            </form>
            {marks !== null && <div>Your marks: {marks}</div>}
          </div>
        )}
        {selectedOption === 'viewColleges' && (
          <div>
            <h3>View Colleges by Marks</h3>
            <ul>
              {colleges.filter(college => marks !== null && marks >= college.cutoff).map(college => (
                <li key={college.name}>{college.name} (Cutoff: {college.cutoff} marks)</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;

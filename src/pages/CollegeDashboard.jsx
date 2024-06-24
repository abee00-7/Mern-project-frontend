import React, { useState } from 'react';
import './CollegeDashboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function CollegeDashboard() {
  const [selectedOption, setSelectedOption] = useState('profile'); // Default selected option
  const [profile, setProfile] = useState({
    collegeName: '',
    email: '',
    place: '',
    description: '',
    courses: '',
    cutoff: ''
  });
  const navigate = useNavigate();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('College Profile Submitted:', profile);
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
        </ul>
      </div>
      <div className="main-content">
      
        <div className="header">
          <h2>College Dashboard</h2>
          <a href="#" className="logout-link" onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i> </a>
        </div>
        {selectedOption === 'profile' && (
          <div>
            <h3>College Profile</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>College Name</label>
                <input type="text" name="collegeName" value={profile.collegeName} onChange={handleProfileChange} placeholder="Enter college name" required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Enter email" required />
              </div>
              <div>
                <label>Place</label>
                <input type="text" name="place" value={profile.place} onChange={handleProfileChange} placeholder="Enter place" required />
              </div>
              <div>
                <label>Description</label>
                <textarea name="description" value={profile.description} onChange={handleProfileChange} placeholder="Enter description" required />
              </div>
              <div>
                <label>Courses Available</label>
                <input type="text" name="courses" value={profile.courses} onChange={handleProfileChange} placeholder="Enter available courses" required />
              </div>
              <div>
                <label>Cutoff Mark</label>
                <input type="number" name="cutoff" value={profile.cutoff} onChange={handleProfileChange} placeholder="Enter cutoff mark" required />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollegeDashboard;

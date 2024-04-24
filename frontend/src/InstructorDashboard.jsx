// InstructorDashboard.js
import React from 'react';
import './InstructorDashboard.css';

const courseData = [
  // Placeholder for course data. You would fetch this data from an API.
  {
    id: '1',
    thumbnailUrl: '/Users/swaralidabhadkar/Documents/NYU/Sem 2/Cloud/Assignment 3/bird.jpg', // Replace with actual thumbnail URL
    title: 'Course Title 1'
  },
  // Add more courses as needed
];

function InstructorDashboard({ onLogout }) {
  return (
    <div>
      <div className="instructor-dashboard">
      <header className="dashboard-header">
        <img src="path-to-logo.png" alt="Logo" className="logo" /> {/* Replace with actual logo path */}
        <div className="user-profile">
          <span>Sambit S</span>
          <img src="path-to-user-avatar.png" alt="User Avatar" className="user-avatar" /> {/* Replace with actual avatar path */}
        </div>
      </header>
      
      <h1>Your Courses</h1>
      
      <div className="courses-grid">
        {courseData.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.thumbnailUrl} alt={course.title} />
            <span>{course.title}</span>
          </div>
        ))}
        
        <div className="course-card add-new">
          <span>+</span>
          <span>Add New Course</span>
        </div>
      </div>
    </div>
      <h1>Instructor Dashboard</h1>
      {/* Display your courses here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default InstructorDashboard;

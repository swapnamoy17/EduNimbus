// InstructorDashboard.js
import React, { useState, useEffect } from 'react';
import NewCoursePopup from './NewCoursePopup';
import './InstructorDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoursesForUser } from './services/course';

const courseData = [
  // Placeholder for course data. You would fetch this data from an API.
  {
    id: '1',
    thumbnailUrl: '/edu-nimbus.png', // Replace with actual thumbnail URL
    title: 'Course Title 1'
  },
  // Add more courses as needed
];

function InstructorDashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to different routes
  let { userId } = useParams();
  
  useEffect(() => {
    console.log("use Effect for fetching courses: " + userId)
    getCoursesForUser(userId)
  }, [userId])

  const handleCourseClick = (courseId) => {
    navigate(`/ins-course/${courseId}`); // Navigating to the course page
  };

  const handleAddNewClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="instructor-dashboard">
      <header className="dashboard-header">
        <img src="/edu-nimbus.png" alt="Logo" className="logo" /> {/* Replace with actual logo path */}
        <div className="user-profile">
          <span>Sambit S</span>
          <img src="/instructor-logo.png" alt="User Avatar" className="user-avatar" /> {/* Replace with actual avatar path */}
        </div>
      </header>
      
      <h1>Your Courses</h1>
      
      <div className="courses-grid">
        {courseData.map((course) => (
          <div key={course.id} className="course-card" onClick={() => handleCourseClick(course.id)}>
            <img src={course.thumbnailUrl} alt={course.title}/>
            <span>{course.title}</span>
          </div>
        ))}
        
        <div className="course-card add-new" onClick={handleAddNewClick}>
          <span>+</span>
          <span>Add New Course</span>
        </div>
      </div>
    </div>
    
    {showPopup && <NewCoursePopup onClose={handleClosePopup} />}
    </div>
  );
}

export default InstructorDashboard;

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
  const [courses, setCourses] = useState([]); // State for fetched courses
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to different routes
  const userId = localStorage.getItem('userId') // Get userId from URL parameters
  
  useEffect(() => {
    if (userId) {
      const fetchAllCourses = async () => {
        setLoading(true);
        setError(null);
        try {
          let response = await getCoursesForUser(userId);
          console.log("Courses response: ", response);
          const coursesList = response?.courses || [];
          setCourses(coursesList);
          if (coursesList.length > 0) {
            setSelectedCourse(coursesList[0]);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          setError('Error fetching courses');
        }
        setLoading(false);
      };

      fetchAllCourses();
    }
  }, [userId]);

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
      
       {/* Loading and error handling */}
       {loading && <p>Loading courses...</p>}
        {error && <p>{error}</p>}

        <div className="courses-grid">
          {!loading && !error && courses.map((course) => (
            <div key={course.course_id} className="course-card" onClick={() => handleCourseClick(course.course_id)}>
              <img src="/edu-nimbus.png" alt={course.course_name}></img>
              <div className="course-info">
                <h2>{course.course_name}</h2>
                <p><strong>Tags:</strong> {course.tags}</p>
                <p><strong>Summary:</strong> {course.summary}</p>
                <p><strong>Rating:</strong> {course.rating}/5</p>
              </div>
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

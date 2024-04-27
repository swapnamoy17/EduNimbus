import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseEnroll.css';

const courses = [
    { id: '1', name: 'Python Fundamentals', summary: 'Intro to Python', rating: 4 },
    { id: '2', name: 'Advanced JavaScript', summary: 'Deep dive into JS', rating: 5 }
];

function CourseSummaryPage() {
const { id } = useParams();
const [course, setCourse] = useState(null);

useEffect(() => {
    const courseDetails = courses.find(course => course.id === id);
    setCourse(courseDetails);
}, [id]);

if (!course) {
    return <div>Loading...</div>;
}

  // Helper to render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={`star ${index < rating ? 'filled' : 'unfilled'}`}>&#9733;</span>
        ))}
      </div>
    );
  };

  return (
    <div className="course-summary-page">
      <header className="course-summary-header">
        <h1>{course.name}</h1>
        <div className="student-profile">
          <span>Geetika B</span>
          <img src="path/to/student/avatar" alt="Student" className="profile-pic" />
        </div>
      </header>
      <div className="course-content">
        <div className="video-player-section">
          <div className="video-container">
            <div className="video-placeholder">Video Player</div>
          </div>
          <div className="enrollment-rating-section">
            <button className="enroll-button">Enroll</button>
            <div className="ratings-container">
              <h3 className="ratings-header">Average Ratings</h3>
              {renderStars(course.rating)}
            </div>
          </div>
        </div>
        <div className="summary-section">
          <h2>Summary</h2>
          <p>{course.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseSummaryPage;

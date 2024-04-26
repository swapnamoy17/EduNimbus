import React from 'react';
import './CourseEnroll.css';

function CourseSummaryPage() {
  const course = {
    name: 'Course Name',
    summary: 'This is a sample summary about a course on Java',
    rating: 4, // Rating out of 5
  };

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

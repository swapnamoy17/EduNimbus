import React from 'react';
import './StudentDashboard.css'; // Make sure to create a corresponding CSS file

// Mock data for courses
const enrolledCourses = [
  {
    id: 1,
    title: 'Python Fundamentals',
    thumbnail: 'path/to/thumbnail.jpg',
    instructor: 'John Doe'
  },
  {
    id: 1,
    title: 'Cloud Computing',
    thumbnail: 'path/to/thumbnail.jpg',
    instructor: 'Sambit Sahu'
  }
  
];

const recommendedCourses = [
  {
    id: 2,
    title: 'Advanced JavaScript',
    thumbnail: 'path/to/thumbnail.jpg',
    instructor: 'Linda Sellie'
  },
  // ... other courses
];

function StudentDashboard({ onLogout, user }) {
  // Render a single course card
  const renderCourse = (course) => (
    <div className="course-card" key={course.id}>
      <img src={course.thumbnail} alt={course.title} />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>
      </div>
    </div>
  );

  return (
    <div className="student-dashboard">
      <header className="student-dashboard-header">
        <h1>Student Dashboard</h1>
        <div className="user-info">
          <span>Geetika B.</span>
          <img src={user?.avatarUrl} alt="user" />
        </div>
      </header>
      <section className="course-section">
        <h2>Enrolled Courses</h2>
        <div className="course-container">
          {enrolledCourses.map(renderCourse)}
        </div>
      </section>
      <section className="course-section">
        <h2>Recommended Courses</h2>
        <div className="course-container">
          {recommendedCourses.map(renderCourse)}
        </div>
      </section>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;

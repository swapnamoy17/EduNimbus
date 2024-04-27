import React from 'react';
import './StudentDashboard.css'; // Make sure to create a corresponding CSS file
import { Link } from 'react-router-dom';
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
  const renderCourse = (course, type) => (
    <Link to={type === 'enrolled' ? `/course/${course.id}` : `/summary/${course.id}`} className="course-card" key={course.id}>
            <img src={course.thumbnail} alt={course.title} />
            <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
            </div>
        </Link>
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
      {enrolledCourses.map(course => renderCourse(course, 'enrolled'))}
      </div>
      </section>
      <section className="course-section">
      <h2>Recommended Courses</h2>
      <div className="course-container">
      {recommendedCourses.map(course => renderCourse(course, 'recommended'))}
      </div>
      </section>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;

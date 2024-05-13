import React, { useState, useEffect } from 'react';
import './StudentDashboard.css'; // Make sure to create a corresponding CSS file
import { Link, useNavigate } from 'react-router-dom';
import { getCoursesForUser } from './services/course';
import SearchComponent from './search';
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

// const recommendedCourses = [
//   {course_id: 17,
//     title: 'Deep Learning',
//     summary: 'In depth course on Deep Learning',
//     tags: ['AI', 'Machine Learning']
//   },
//   {course_id: 9,
//     title: 'Java',
//     summary: 'In depth course on Java',
//     tags: ['Java', 'Software Engineering']
//   }
//   // ... other courses
// ];

function StudentDashboard({ onLogout, user }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId')
  console.log(userId)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getCoursesForUser(userId);
        console.log("Courses response: ", result);
        setEnrolledCourses(result.courses || []); // Assuming the API returns an object with a courses array
      } catch (err) {
        setError('Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  useEffect(() => {
    const handleBackButton = () => {
      navigate('/login', { replace: true });
    };

    window.addEventListener('popstate', handleBackButton);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  // Render a single course card
  const renderCourse = (course, type) => (
    // <Link to={type === 'enrolled' ? `/course/${course.course_id}` : `/summary/${course.course_id}`} className="course-card" key={course.course_id}>
    <Link to={`/course/${course.course_id}`} 
        state={{ isRecommended: type === 'recommended' }} // Pass isRecommended based on type
        className="course-card" 
        key={course.course_id}>
            <img src='/no_content.png' alt={course.course_name} ></img>
            <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                <p>{course.tags}</p>
            </div>
        </Link>
  );

  return (
    <div className="student-dashboard">
      <SearchComponent />
      <section className="course-section">
      <h2>Enrolled Courses</h2>
      <div className="course-container">
      {enrolledCourses.map(course => renderCourse(course, 'enrolled'))}
      </div>
      </section>
      {/* <section className="course-section">
      <h2>Recommended Courses</h2>
      <div className="course-container">
      {recommendedCourses.map(course => renderCourse(course, 'recommended'))}
      </div>
      </section> */}
    </div>
  );
}

export default StudentDashboard;

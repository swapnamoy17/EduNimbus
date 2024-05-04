// InstructorDashboard.js
import React, { useState, useEffect } from 'react';
//import NewCoursePopup from './NewCoursePopup';
import './InstructorDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoursesForUser, addNewCourse} from './services/course';

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
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newSummary, setNewSummary] = useState(''); 
  const tagsList = ['AI', 'Machine Learning', 'Data Science', 'Big Data', 'Analytics']; // Example tags

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

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    const newTags = selectedTags.join(','); // Convert selected tags to string
    const newCourseData = { course_name: newCourseName, tags: newTags, summary: newSummary, userId };
    try {
      const response = await addNewCourse(newCourseData);
      console.log('Course added:', response);
      setCourses([...courses, { ...newCourseData, course_id: response.courseId }]);
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevSelected => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter(t => t !== tag); // Deselect tag
      } else {
        return [...prevSelected, tag]; // Select tag
      }
    });
  };

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
    
    {showPopup && (
        <div className="popup">
          <form onSubmit={handleAddCourseSubmit}>
            <h2>Add New Course</h2>
            <label>
              Course Name:
              <input type="text" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} required />
            </label>
            <label>
              Tags:
              <div className="tags-container">
                {tagsList.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </label>
            <label>
              Summary:
              <textarea value={newSummary} onChange={(e) => setNewSummary(e.target.value)} required></textarea>
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClosePopup}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default InstructorDashboard;

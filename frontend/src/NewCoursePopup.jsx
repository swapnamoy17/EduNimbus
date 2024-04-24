// NewCoursePopup.jsx
import React, { useState } from 'react';
import './NewCoursePopup.css'; // make sure to create appropriate CSS for this

function NewCoursePopup({ onClose }) {
    const [courseName, setCourseName] = useState('');
  // Assuming these are your available tags
  const availableTags = ['AI', 'Machine Learning', 'Data Science', 'Big Data', 'Analytics'];
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = () => {
    // Logic to handle submission of the new course
    console.log(courseName, selectedTags);
    // Close the popup after submitting
    onClose();
  };

  const toggleTag = (tag) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]);
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <h2>New Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <div className="tags-container">
          {availableTags.map((tag, index) => (
            <div
              key={index}
              className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewCoursePopup;
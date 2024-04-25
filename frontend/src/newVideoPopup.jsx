import React, { useState } from 'react';
import './NewCoursePopup.css'; // make sure to create appropriate CSS for this

function NewVideoPopup({ onClose }) {
    const [videoName, setVideoName] = useState('');
  // Assuming these are your available tags
  const availableTags = ['AI', 'Machine Learning', 'Data Science', 'Big Data', 'Analytics'];
  const [selectedTags, setSelectedTags] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = () => {
    // Logic to handle submission of the new course
    console.log(videoName, selectedTags);
    // Close the popup after submitting
    onClose();
  };

  const handleFileChange = (file) => {
    // Handle the selected file here, for example, you can set it to state
    setVideoFile(file);
  };

  const toggleTag = (tag) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]);
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <h2>New Video</h2>
        <input
          type="text"
          placeholder="Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
        />
        <div className="video-container">
          {/* {availableTags.map((tag, index) => (
            <div
              key={index}
              className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </div>
          ))} */}
          <input
      type="file"
      accept="video/*"
      onChange={(e) => handleFileChange(e.target.files[0])}
    />
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewVideoPopup;
import React, { useState } from 'react';
import './NewCoursePopup.css'; // make sure to create appropriate CSS for this

function NewQuizPopup({ onClose }) {
    const [quizName, setQuizName] = useState('');
  // Assuming these are your available tags
  const availableVideos = [
    {
      id: '1',
      title: 'Video 1'
    },
    {
      id: '2',
      title: 'Video 2'
    },
    {
      id: '3',
      title: 'Video 3'
    }
  ]
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSubmit = () => {
    // Logic to handle submission of the new course
    console.log(quizName, selectedVideos);
    // Close the popup after submitting
    onClose();
  };

  const toggleVideo = (video) => {
    setSelectedVideos(selectedVideos.includes(video)
      ? selectedVideos.filter(t => t !== video)
      : [...selectedVideos, video]);
  };

  return (
    <div className="popup-backdrop">
      <div className="quiz-ppt-popup-content">
        <h2>New Quiz</h2>
        <input
          type="text"
          placeholder="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        <div className="video-tags-container">
          {availableVideos.map((video, index) => (
            <div
              key={index}
              className={`tag ${selectedVideos.includes(video.title) ? 'selected' : ''}`}
              onClick={() => toggleVideo(video.title)}
            >
              {video.title}
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewQuizPopup;
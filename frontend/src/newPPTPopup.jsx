import React, { useState } from 'react';
import './NewCoursePopup.css'; // make sure to create appropriate CSS for this
import { addNewPPT } from './services/ppt';

function NewPPTPopup({ onClose, videos }) {
    const [pptName, setpptName] = useState('');
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

  const handleSubmit = async () => {
    // Logic to handle submission of the new course
    console.log(pptName, selectedVideos);
    // Close the popup after submitting
    if (!pptName) {
      alert('Please enter a quiz name.');
      return;
    }
    if (selectedVideos.length == 0)
    {
      alert("Please select a video");
      return;
    }

    try {
      const response = await addNewPPT(pptName, selectedVideos);
      console.log('PPT generated Successfully:', response);
      onClose(); // Close the popup after successful upload
    } catch (error) {
      console.error('PPT generation failed:', error);
      alert('PPT generation failed');
    }
  };

  const toggleVideo = (video) => {
    setSelectedVideos(selectedVideos.includes(video.id)
      ? selectedVideos.filter(t => t !== video.id)
      : [...selectedVideos, video.id]);
      console.log("Hello from toggle", video)
      console.log("'Selected videos", selectedVideos)
  };

  if (!videos) {
    console.log("Hello man", videos)
    return null; // Or you can render a loading indicator or handle the case differently
  }

  return (
    <div className="popup-backdrop">
      <div className="quiz-ppt-popup-content">
        <h2>New PPT</h2>
        <input
          type="text"
          placeholder="PPT Name"
          value={pptName}
          onChange={(e) => setpptName(e.target.value)}
        />
        <div className="video-tags-container">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`tag ${selectedVideos.includes(video.id) ? 'selected' : ''}`}
              onClick={() => toggleVideo(video)}
            >
              {video.name}
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewPPTPopup;
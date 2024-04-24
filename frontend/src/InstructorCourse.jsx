import React, { useState, useEffect } from 'react';
import CloudComputingLogo from './cloudlogo.png';
import SambitSAvatar from './sambit.jpeg';
import './InstructorCourse.css';
// import SampleVideo from './sample-video.mp4';
// import SampleBand from './sample-band.jpg';

function InstructorCourse() {
  const [quizData, setQuizData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [pptData, setPPTData] = useState([]);

  // Dummy data for demonstration purposes
  const dummyQuizData = [
    { id: 1, title: 'Quiz 1' },
    { id: 2, title: 'Quiz 2' },
  ];
   
  const dummyVideoData = [
    {
      id: '1',
      thumbnailUrl: '/Users/swaralidabhadkar/Documents/NYU/Sem 2/Cloud/Assignment 3/bird.jpg', // Replace with actual thumbnail URL
      title: 'Video 1'
    },
  ];

  const dummyPPTData = [
    {
        id: '1',
        title: 'PPT 1'
    }
  ]


  useEffect(() => {
    // Simulating an API call to fetch quiz data
    setTimeout(() => {
      setQuizData(dummyQuizData);
      setVideoData(dummyVideoData);
      setPPTData(dummyPPTData);
    }, 1000); // 1 second delay for demonstration
  }, []);

  return (
    <div>
        <div className="instructor-course">
        <header className="instructor-header">
            <div className='header-content'>
        <img src={CloudComputingLogo} alt="Logo" className="logo" />
        <div className='course-name'>
            <span>How to Sleep</span>
        </div>
        <div className="user-profile">
          <span>Sambit S</span>
          <img src={SambitSAvatar} alt="User Avatar" className="user-avatar" />
        </div>
        </div>
      </header>

      <h1>Your Videos</h1>

      <div className="video-grid">
        {videoData.map((video) => (
          <div key={video.id} className="card">
            <img src={video.thumbnailUrl} alt={video.title} />
            <span>{video.title}</span>
          </div>
        ))}
        
        <div className="card add-new">
          <span>+</span>
          <span>Add New Video</span>
        </div>
      </div>
    
      <h1>Your Quizes</h1>
      <div className="quiz-grid">
        {quizData.map((quiz) => (
            <div key={quiz.id} className="card">
            <span>{quiz.title}</span>
          </div>
        ))}
        <div className="card add-new">
          <span>+</span>
          <span>Add New Quizes</span>
        </div>
      </div>

      <h1>Your PPTs</h1>
      <div className="ppt-grid">
        {pptData.map((ppt) => (
            <div key={ppt.id} className="card">
            <span>{ppt.title}</span>
          </div>
        ))}
        <div className="card add-new">
          <span>+</span>
          <span>Add New PPTs</span>
        </div>
      </div>
    
    </div>
    </div>
  );
}

export default InstructorCourse;
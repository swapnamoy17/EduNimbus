import React, { useEffect } from 'react';
import './CoursePage.css';
import { getVideosForCourse } from './services/video';

function CoursePage() {
  const courseId = 1;
  const videoLinks = ["Video 1", "Video 2", "Video 3", "Video 4"];
  const quizzes = ["Quiz 1", "Quiz 2"];
  const ppts = ["PPT 1", "PPT 2"];

  useEffect(() => {
    console.log("use Effect for fetching videos for course: " + courseId)
    getVideosForCourse(courseId)
  }, [])

  return (
    <div className="course-page">
      <header className="course-header">
        <h1>Cloud Computing</h1>
        <div className="user-info">
          <span>Sambit S</span>
          <img src="path/to/user/avatar" alt="User" />
        </div>
      </header>
      <div className="main-content">
        <div className="video-player-container">
          <div className="video-placeholder">Video Player</div>
          <h2>Docker & Kubernetes</h2>
          
          <div className="quizzes-section">
            <h3 className="section-title">Quizzes</h3>
            <div className="quizzes-list">
              {quizzes.map((quiz, index) => (
                <a key={`quiz-${index}`} href="#" className="quiz-item">{quiz} Attempt</a>
              ))}
            </div>
          </div>
          <div className="ppts-section">
            <h3 className="section-title">Presentations</h3>
            <div className="ppts-list">
              {ppts.map((ppt, index) => (
                <a key={`ppt-${index}`} href="#" className="ppt-item">{ppt} Download</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="sidebar">
          <div className="videos-list">
            <h3>Videos</h3>
            <ul>
              {videoLinks.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CoursePage;

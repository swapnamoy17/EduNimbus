import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { getVideosForCourse, streamVideo } from './services/video';
import { useParams } from 'react-router-dom';

function CoursePage() {

  let { courseId } = useParams();

  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoName, setVideoName] = useState('abcd');

  const videos = [{
                        "name": "Do you want ice-cream?",
                        "id": 1
                      },
                      {
                        "name": "Boring",
                        "id": 2
                      }];
  const quizzes = ["Quiz 1", "Quiz 2"];
  const ppts = ["PPT 1", "PPT 2"];

  useEffect(() => {
    console.log("use Effect for fetching videos for course: " + courseId)
    getVideosForCourse(courseId)
    if (courseId === '1') {
      setVideoId(1);
      setVideoName(videos.filter(video => video.id === 1)[0]?.name);
    } else {
      setVideoId(2);
      setVideoName(videos.filter(video => video.id === 2)[0]?.name);
    }
  }, [courseId])

  useEffect(() => {
    if (videoId) {
      console.log("use Effect for fetching stream video: " + videoId + "for course: " + courseId)
      const fetchVideo = async () => {
        try {
          let response = await streamVideo(videoId);
          console.log("streaming response: ", response);
          setVideoUrl(response.video);
        } catch (error) {
          console.error("Failed to fetch video", error);
        }
      };

      fetchVideo();
    }
  }, [videoId])

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
          <div className="video-placeholder">
            <video key={videoUrl} controls>
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
            </video>
          </div>
          <h2>{videoName}</h2>
          
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
              {videos.map((video, index) => (
                <li key={index}>{video.name}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CoursePage;

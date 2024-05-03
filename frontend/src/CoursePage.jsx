import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { getVideosForCourse, streamVideo } from './services/video';
import { useParams } from 'react-router-dom';

function CoursePage() {

  let { courseId } = useParams();

  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videos, setVideos] = useState([]);

  const quizzes = ["Quiz 1", "Quiz 2"];
  const ppts = ["PPT 1", "PPT 2"];

  useEffect(() => {
    if (courseId) {
      console.log("use Effect for fetching videos for course: " + courseId)

      const fetchAllVideos = async () => {
        let response = await getVideosForCourse(courseId);
        console.log("/ - get response: ", response);
        const videos = response?.videos;
        const firstVideoId = videos[0]?.id;
        const videoName = videos.filter(video => video.id === firstVideoId)[0]?.name;
        setVideoId(firstVideoId);
        setVideoName(videoName);
        setVideos(videos);
      }

      fetchAllVideos();
    }
  }, [courseId])

  useEffect(() => {
    if (videoId) {
      console.log("use Effect for fetching stream video: " + videoId + "for course: " + courseId)
      const fetchVideo = async () => {
        let response = await streamVideo(videoId);
        console.log("streaming response: ", response);
        setVideoUrl(response.video);
      };

      fetchVideo();
    }
  }, [videoId])

  const handleVideoClick = (id) => {
    setVideoId(id);
    setVideoName(videos.filter(video => video.id === id)[0]?.name);
  };

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
            <video key={videoUrl} controls controlsList="nodownload">
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
              {videos.filter(video => video.id !== videoId).map((video) => (
                <li key={video.id} onClick={() => handleVideoClick(video.id)}>{video.name}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CoursePage;

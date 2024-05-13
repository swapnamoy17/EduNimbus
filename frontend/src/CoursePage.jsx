import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { getVideosForCourse, streamVideo } from './services/video';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizesForVideo } from './services/quiz';
import { getPPTsForVideo } from './services/ppt';
import axios from 'axios';

function CoursePage() {

  let { courseId } = useParams();

  function formatSubtitles(subtitles) {
    const formattedSubtitles = subtitles.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
    return formattedSubtitles;
  }

  async function createDataUri(preSignedUrl='') {
    try {
      const response = await axios.get(preSignedUrl);
      const transcript = response.data;
  
      const header = "WEBVTT\n\n";
      let formattedText = header + transcript.replace(/\n/g, '\n');
      formattedText = formatSubtitles(formattedText);
      console.log("cgvhgdcvsbdcjdcsx", formattedText);
      const encodedSubtitles = encodeURIComponent(formattedText);
      return `data:text/vtt;charset=utf-8,${encodedSubtitles}`;
    } catch (error) {
      console.error('Failed to fetch or process transcript:', error);
      return null;
    }
  }

  const [videoUrl, setVideoUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videos, setVideos] = useState([]);
  const userId = localStorage.getItem('userId')
  const [quizes, setQuizes] = useState([]);
  const navigate = useNavigate();
  const [ppts, setPpts] = useState([]);

  const quizzes = ["Quiz 1", "Quiz 2"];
  //const ppts = ["PPT 1", "PPT 2"];

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
        let transcript = await createDataUri(response.transcript);
        setVideoUrl(response.video);
        setSubtitle(transcript);

        //for quizes
        let quizresponse = await getQuizesForVideo(videoId);
        console.log("Hello from quizes", quizresponse)
        if (quizresponse.quizes.length > 0) {
          console.log("Hello from quizes mi nino ", quizresponse.quizes[0].quiz_ref);
        }
        setQuizes(quizresponse.quizes || [])

        let pptresponse = await getPPTsForVideo(videoId);
        console.log("Hello from quizes", pptresponse)
        if (pptresponse.ppts.length > 0) {
          console.log("Hello from quizes mi nino ppt ", pptresponse.ppts[0].ppt_ref);
        }
        setPpts(pptresponse.ppts || [])
      };

      fetchVideo();
    }
  }, [videoId])

  const handleVideoClick = (id) => {
    setVideoId(id);
    setVideoName(videos.filter(video => video.id === id)[0]?.name);
  };

  const handleQuizButtonClick = (quiz) => {
    navigate(`/course/${courseId}/quiz/${quiz.quiz_id}`);
  }

  const handlePPTButtonClick = (ppt) => {
    navigate(`/course/${courseId}/ppt/${ppt.ppt_id}`);
  }

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
              {(
                <track 
                  src={subtitle}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
          </div>
          <h2>{videoName}</h2>
          
          <div className="quizzes-section">
            <h3 className="section-title">Quizzes</h3>
            <div className="quizzes-list">

              {/* {quizes.map((quize, index) => (
                <a key={`quiz-${index}`} href="#" className="quiz-item">{quize.quiz_name}</a>
              ))} */}
              {quizes.map((quize, index) => (
              <button 
                key={`quiz-${index}`} 
                className="quiz-item" 
                onClick={() => handleQuizButtonClick(quize)}
              >
              {quize.quiz_name}
              </button>
              ))}
            </div>
          </div>
          <div className="ppts-section">
            <h3 className="section-title">Presentations</h3>
            <div className="ppts-list">
            {ppts.map((ppt, index) => (
              <button 
                key={`ppt-${index}`} 
                className="quiz-item" 
                onClick={() => handlePPTButtonClick(ppt)}
              >
              {ppt.ppt_name}
              </button>
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

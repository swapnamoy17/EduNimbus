import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { getVideosForCourse, streamVideo } from './services/video';
import { useCourses } from './CourseContext';  // Assuming you have created this Context
import axios from 'axios';

function CoursePage() {
    const { courseId } = useParams();
    const navigate = useNavigate(); // This replaces useHistory
    const location = useLocation();
    const { enrolledCourses, enrollCourse } = useCourses();
    
    const [videos, setVideos] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoName, setVideoName] = useState('');
    const isRecommended = location.state?.isRecommended || false;

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
            const encodedSubtitles = encodeURIComponent(formattedText);
            return `data:text/vtt;charset=utf-8,${encodedSubtitles}`;
        } catch (error) {
            console.error('Failed to fetch or process transcript:', error);
            return null;
        }
    }

    useEffect(() => {
        const fetchAllVideos = async () => {
            const response = await getVideosForCourse(courseId);
            setVideos(response?.videos || []);
            if (response?.videos.length > 0) {
                const firstVideo = response.videos[0];
                setVideoId(firstVideo.id);
                setVideoName(firstVideo.name);
                fetchVideoDetails(firstVideo.id);
            }
        };

        fetchAllVideos();
    }, [courseId]);

    const fetchVideoDetails = async (id) => {
        const response = await streamVideo(id);
        setVideoUrl(response.video);
        let transcript = await createDataUri(response.transcript);
        setSubtitle(transcript);
    };

    const handleEnroll = async () => {
        const success = await enrollCourse(courseId);
        if (success) {
          navigate(`/course/${courseId}`, { replace: true, state: { isRecommended: false } }); // Use navigate for redirection
        } else {
            alert('Failed to enroll!');
        }
    };

    const handleVideoClick = (id) => {
        if (!isRecommended) {
            setVideoId(id);
            setVideoName(videos.filter(video => video.id === id)[0]?.name);
        }
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
                            <track 
                                src={subtitle}
                                kind="subtitles"
                                srcLang="en"
                                label="English"
                                default
                            />
                        </video>
                    </div>
                    <h2>{videoName}</h2>
                    {isRecommended ? (
                        <button onClick={handleEnroll}>Enroll in Course</button>
                    ) : (
                        <div>
                            <div className="quizzes-section">
                                <h3 className="section-title">Quizzes</h3>
                                {/* Example quiz list */}
                                <div className="quizzes-list">
                                    <a href="#" className="quiz-item">Quiz 1</a>
                                    <a href="#" className="quiz-item">Quiz 2</a>
                                </div>
                            </div>
                            <div className="ppts-section">
                                <h3 className="section-title">Presentations</h3>
                                <div className="ppts-list">
                                    <a href="#" className="ppt-item">PPT 1 Download</a>
                                    <a href="#" className="ppt-item">PPT 2 Download</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <aside className="sidebar">
                    <div className="videos-list">
                        <h3>Videos</h3>
                        <ul>
                            {videos.map((video) => (
                                <li key={video.id} className={isRecommended && video.id !== videoId ? 'disabled' : ''} onClick={() => handleVideoClick(video.id)}>
                                    {video.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default CoursePage;

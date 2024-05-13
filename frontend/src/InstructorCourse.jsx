import React, { useState, useEffect } from 'react';
// import CloudComputingLogo from './edu-nimbus.png';
import SambitSAvatar from './sambit.jpeg';
import { uploadVideo } from './services/video';
import './InstructorCourse.css';
import NewQuizPopup from './newQuizPopup';
import NewPPTPopup from './newPPTPopup';
import NewVideoPopup from './newVideoPopup';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideosForCourse } from './services/video';
import { getQuizesForVideo } from './services/quiz';
import { getQuizesForCourse } from './services/quiz';
import { getPPTsForCourse } from './services/ppt';
// import SampleVideo from './sample-video.mp4';
// import SampleBand from './sample-band.jpg';

function InstructorCourse() {
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [pptData, setPPTData] = useState([]);
  const [showQuizPopup, setShowQuizPopup] = useState(false, []);
  const [showPPTPopup, setShowPPTPopup] = useState(false);
  const userId = localStorage.getItem('userId')
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videos, setVideos] = useState([]);
  const [newVideoAdded, setNewVideoAdded] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [newQuizAdded, setNewQuizAdded] = useState(false);
  const [newPPTAdded, setNewPPTAdded] = useState(false);
  const [ppts, setPppts] = useState([]);
  const navigate = useNavigate();

  const handleAddNewClickQuiz = () => {
        setNewQuizAdded(false)
        setShowQuizPopup(true);
  };

  const handleAddNewClickPPT = () => {
    setNewPPTAdded(true)
    setShowPPTPopup(true);
};

const handleAddNewClickVideo = () => {
    setNewVideoAdded(false);
    setShowVideoPopup(true);
};

  const handleClosePopupQuiz = () => {
        setNewQuizAdded(true);
        setShowQuizPopup(false);
  };
 
  const handleClosePopupPPT = () => {
    setNewPPTAdded(false);
    setShowPPTPopup(false);
};

const handleClosePopupVideo = () => {
  setShowVideoPopup(false);
  setNewVideoAdded(true);
};


  // Dummy data for demonstration purposes
  const dummyQuizData = [
    { id: 1, title: 'Quiz 1' },
    { id: 2, title: 'Quiz 2' },
  ];
   
  const dummyVideoData = [
    {
      id: '1',
      thumbnailUrl: '/edu-nimbus.png', // Replace with actual thumbnail URL
      title: 'Video 1'
    },
  ];

  const dummyPPTData = [
    {
        id: '1',
        title: 'PPT 1'
    }
  ]

  // useEffect(() => {
  //     if (newVideoAdded) {
  //       setVideos()
  //     }
  // }, [newVideoAdded, newVideoAdded])

  const handleVideoUploadStart = async (file, videoName) => {
    try {
        const response = await uploadVideo(userId, courseId, file, videoName);
        console.log('Upload successful:', response);
        setVideos(prev => [...prev, {name:videoName,id:response[1]}]); // Assuming response contains new video data
    } catch (error) {
        console.error('Upload failed:', error);
    }
};

  useEffect(() => {
    // Simulating an API call to fetch quiz data
    const fetchVideos = async () => {
      try {
        // Call the getVideosForCourse function
        console.log("Hello")
        const response = await getVideosForCourse(courseId);
        console.log("hello again")
        console.log(response)
        setVideos(response.videos || []);
        console.log(videos) // Assuming response.data contains the list of videos

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    
      if (userId || newVideoAdded) {
        fetchVideos();
     }
    
      setTimeout(() => {
        setQuizData(dummyQuizData);
        setVideoData(dummyVideoData);
        setPPTData(dummyPPTData);
       }, 1000); 
   

    console.log(videos)
  }, [userId, newVideoAdded]);

  useEffect(() => {
    const fetchQuizes = async (courseId) => {
      console.log("Hello from the other side")

      
      let quizresponse = await getQuizesForCourse(courseId);
      console.log(quizresponse.quizes)
      if (quizresponse.quizes.length > 0) {
        console.log("Hello from quizes mi nino ", quizresponse.quizes[0].quiz_ref);
      }
      setQuizes(quizresponse.quizes || [])
    }

    if (userId || newQuizAdded) {
      fetchQuizes(courseId)
    }
  }, [userId, newQuizAdded]);

  useEffect(() => {
    const fetchPpts = async (courseId) => {
      console.log("Hello from the other side")

      
      let pptresponse = await getPPTsForCourse(courseId);
      console.log(pptresponse.ppts)
      if (pptresponse.ppts.length > 0) {
        console.log("Hello from quizes mi nino ", pptresponse.ppts[0].ppt_ref);
      }
      setPppts(pptresponse.ppts || [])
    }

    if (userId || newQuizAdded) {
      fetchPpts(courseId)
    }
  }, [userId, newPPTAdded]);

  const handleQuizButtonClick = (quiz) => {
    navigate(`/ins-course/${courseId}/quiz/${quiz.quiz_id}`);
  }

  const handlePPTButtonClick = (ppt) => {
    navigate(`/ins-course/${courseId}/ppt/${ppt.ppt_id}`);
  }

  return (
    <div>
        <div className="instructor-course">

      <h1>Your Videos</h1>

      <div className="video-grid">
        {/* {videoData.map((video) => (
          <div key={video.id} className="card">
            <img src={video.thumbnailUrl} alt={video.title} />
            <span>{video.title}</span>
          </div>
        ))} */}
        {videos.map((video) => (
        <div key={video.id} className="card">
          <img src={'/edu-nimbus.png'} alt={video.name} />
          <span>{video.name}</span>
        </div>
      ))}
        
        <div className="card add-new" onClick={handleAddNewClickVideo}>
          <span>+</span>
          <span>Add New Video</span>
        </div>
      </div>
    
      <h1>Your Quizes</h1>
      <div className="quiz-grid">
        {quizes.map((quiz) => (
            <div key={quiz.quiz_ref} className="card" onClick={() => handleQuizButtonClick(quiz)}>
            <span>{quiz.quiz_name}</span>
          </div>
        ))}
        <div className="card add-new" onClick={handleAddNewClickQuiz}>
          <span>+</span>
          <span>Add New Quizes</span>
        </div>
      </div>

      <h1>Your PPTs</h1>
      <div className="ppt-grid">
      {ppts.map((ppt) => (
            <div key={ppt.ppt_ref} className="card" onClick={() => handlePPTButtonClick(ppt)}>
            <span>{ppt.ppt_name}</span>
          </div>
        ))}
        <div className="card add-new" onClick={handleAddNewClickPPT}>
          <span>+</span>
          <span>Add New PPTs</span>
        </div>
      </div>
    
    </div>
    {showQuizPopup && <NewQuizPopup onClose={handleClosePopupQuiz} videos={videos} />}
    {showVideoPopup && <NewVideoPopup onClose={handleClosePopupVideo} courseId={courseId} onVideoUploadStart={handleVideoUploadStart} />}
    {showPPTPopup && <NewPPTPopup onClose={handleClosePopupPPT} videos={videos}/>}
    </div>
  );
}

export default InstructorCourse;
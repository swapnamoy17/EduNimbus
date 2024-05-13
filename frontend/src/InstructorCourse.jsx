import React, { useState, useEffect } from 'react';
// import CloudComputingLogo from './edu-nimbus.png';
import SambitSAvatar from './sambit.jpeg';
import './InstructorCourse.css';
import NewQuizPopup from './newQuizPopup';
import NewPPTPopup from './newPPTPopup';
import NewVideoPopup from './newVideoPopup';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getVideosForCourse } from './services/video';
import { getQuizesForVideo } from './services/quiz';
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

  const handleAddNewClickQuiz = () => {
        setShowQuizPopup(true);
  };

  const handleAddNewClickPPT = () => {
    setShowPPTPopup(true);
};

const handleAddNewClickVideo = () => {
    setNewVideoAdded(false);
    setShowVideoPopup(true);
};

  const handleClosePopupQuiz = () => {
        setShowQuizPopup(false);
  };
 
  const handleClosePopupPPT = () => {
    setShowPPTPopup(false);
};

const handleClosePopupVideo = () => {
  
  setTimeout(() => {
    setShowVideoPopup(false);
    setNewVideoAdded(true);
   }, 10000)
    
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

        //await fetchQuizes(videos)
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    // const fetchQuizes = async (videos) => {
    //   console.log("Hello from the other side")
    //   let quizresponse = [];

      
    //   let quizresponse = await getQuizesForVideo(videoId);
    //   console.log(quizresponse.quizes)
    //   if (quizresponse.quizes.length > 0) {
    //       console.log("Hello from quizes mi nino ", quizresponse.quizes[0].quiz_ref);
    //       for (let i = 0; i < quizresponse.quizes.length; i++)
    //       {

    //       }
    //   }
    //   setQuizes(quizresponse.quizes || [])
    // }

    
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
        {quizData.map((quiz) => (
            <div key={quiz.id} className="card">
            <span>{quiz.title}</span>
          </div>
        ))}
        <div className="card add-new" onClick={handleAddNewClickQuiz}>
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
        <div className="card add-new" onClick={handleAddNewClickPPT}>
          <span>+</span>
          <span>Add New PPTs</span>
        </div>
      </div>
    
    </div>
    {showQuizPopup && <NewQuizPopup onClose={handleClosePopupQuiz} videos={videos} />}
    {showVideoPopup && <NewVideoPopup onClose={handleClosePopupVideo} courseId={courseId} />}
    {showPPTPopup && <NewPPTPopup onClose={handleClosePopupPPT} />}
    </div>
  );
}

export default InstructorCourse;
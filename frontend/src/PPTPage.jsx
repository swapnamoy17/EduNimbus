import React, { useState, useEffect } from 'react';
import { Presentation, Slide, Text } from 'react-pptx';
import { useParams } from 'react-router-dom';
import { getSinglePPT } from './services/ppt';
import axios from 'axios'; // or use the AWS SDK
import './PPTPage.css';

function PPTPage() {
  const [slideData, setSlideData] = useState([]);
  let { courseId, pptId } = useParams();
  const [pptName, setPPTName] = useState('');
  const [ppt, setPPT] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchPPT = async (pptId) => {
        console.log('pptId', pptId)
        console.log('courseId', courseId)
        console.log("Hello from the other side")
  
        
        let pptresponse = await getSinglePPT(pptId);
        let pptjson = JSON.parse(pptresponse.ppt)
        console.log('Hello mi nino', pptjson.pages)
        if (pptresponse > 0) {
          console.log("Hello from quizes mi nino ", pptresponse);
        }

        setPPTName(pptresponse.name)
        setPPT(pptjson.pages || [])
      }
  
      if (pptId) {
        fetchPPT(pptId)
      }
  }, [pptId])

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < ppt.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  if (ppt.length == 0) {
    // Render loading indicator while JSON data is being fetched
    return <div>Loading...</div>;
  }

  console.log("Hello from ppt ", ppt)

  return (
    <div className="presentation">
      <div className="slide">
        <h1>{ppt[currentSlideIndex].heading}</h1>
        <p>{ppt[currentSlideIndex].pagecontent}</p>
        <p className="page-number">Page Number: {ppt[currentSlideIndex].pagenumber}</p>
      </div>
      <div className="controls">
        <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0}>
          Previous
        </button>
        <button onClick={goToNextSlide} disabled={currentSlideIndex === ppt.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PPTPage;
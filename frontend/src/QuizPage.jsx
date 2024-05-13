import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleQuize } from './services/quiz';
import axios from 'axios';
import './QuizPage.css';

function QuizPage() {
    let { courseId, quizId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const userId = localStorage.getItem('userId');
  const [quiz, setQuiz] = useState([]);
  const [quizName, setQuizName] = useState('');
  let params = useParams();
  console.log('Hello from params', params);
  console.log('courseId ', courseId, 'quizId ', quizId);
  
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers(prevState => ({
        ...prevState,
        [questionIndex]: option
      }));
    };

  const handleSubmit = () => {
    let currentScore = 0;
    quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  useEffect(() => {
    const fetchQuizes = async (quizId) => {
        console.log('quizId', quizId)
        console.log('courseId', courseId)
        console.log("Hello from the other side")
  
        
        let quizresponse = await getSingleQuize(quizId);
        let quizjson = JSON.parse(quizresponse.quiz)
        console.log('Hello mi nino', quizjson.questions)
        if (quizresponse > 0) {
          console.log("Hello from quizes mi nino ", quizresponse);
        }
        setQuizName(quizresponse.name)
        setQuiz(quizjson.questions || [])
      }
  
      if (quizId) {
        fetchQuizes(quizId)
      }
  }, [quizId])

  if (quiz.length == 0) {
    // Render loading indicator while JSON data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h1>{quizName}</h1>
      {quiz.map((question, index) => (
        <div key={index} className="question">
          <h2>{question.question}</h2>
          <ul className="options">
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex} className="option">
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleOptionSelect(index, option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score: {score}/{quiz.length}</p>}
    </div>
  );
}

export default QuizPage;

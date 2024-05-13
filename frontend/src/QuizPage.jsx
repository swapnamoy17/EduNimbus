import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleQuize } from './services/quiz';
import axios from 'axios';

function QuizPage() {
    let { courseId, quizId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const userId = localStorage.getItem('userId');
  const [quiz, setQuiz] = useState([]);
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
        setQuiz(quizjson.questions || [])
      }
  
      if (quizId) {
        fetchQuizes(quizId)
      }
  }, [quizId])

  return (
    <div>
      <h1>Quiz</h1>
      {quiz.map((question, index) => (
        <div key={index}>
          <h2>{question.question}</h2>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
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

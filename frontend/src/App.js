import React, { useEffect, useContext } from 'react'
import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom'
import Home from './Home';
import Signup from './Signup';
import Login from './LoginPage';
import Navbar from './Navbar';
import InstructorDashboard from './InstructorDashboard';
import InstructorCourse from './InstructorCourse';
import StudentDashboard from './StudentDashboard';
import CoursePage from './CoursePage';
import CourseSummaryPage from './CourseEnroll';
import { logout } from './authenticate';
import { useUserState } from './redux/useUserState';
import WebSocketContext from './WebSocketContext';

import './App.css';
import userpool from './userpool';
import QuizPage from './QuizPage';

function App() {
  const INSTRUCTOR_GROUP = "Instructors"
  const STUDENT_GROUP = "Students"

  const { userGroups } = useUserState();
  const { disconnectWebSocket } = useContext(WebSocketContext);

  useEffect(()=>{
    let user=userpool.getCurrentUser();
    const storedData = localStorage.getItem('token');

    // Parse the data if it's in JSON format
    if (storedData) {
      const parsedData = storedData;
      console.log("Hello from parsed ", parsedData);
      //setUserData(parsedData);
    }
      if(user){
        <Navigate to="/dashboard" replace />
      }
  },[]);

  const getDashboard = () => {
    console.log("getdashboard() func...userGroups: ", userGroups)
    if (userGroups.includes(INSTRUCTOR_GROUP)) {
        return <InstructorDashboard onLogout={logout} />;
    } else if (userGroups.includes(STUDENT_GROUP)) {
        return <StudentDashboard onLogout={logout} />;
    } else {
        return <Navigate to="/" />;
    }
  };

  const onLogout = () => {
    logout();
    disconnectWebSocket();
  }

  return (
    <BrowserRouter>
      <Navbar onLogout={onLogout}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/dashboard" element={getDashboard()} />
        <Route path="/ins-course/:courseId" element={<InstructorCourse />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/summary/:id" element={<CourseSummaryPage />} />
        <Route path="/course/:courseId/:quizId" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

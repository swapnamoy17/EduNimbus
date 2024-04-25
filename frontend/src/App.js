import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import InstructorCourse from './InstructorCourse';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={user ? getDashboard() : <Navigate to="/" />} />
        <Route path="/ins-dash" element={<InstructorDashboard />} />
        <Route path="/ins-course" element={<InstructorCourse />} />
        <Route path="/stu" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

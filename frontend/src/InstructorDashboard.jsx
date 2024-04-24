// InstructorDashboard.js
import React from 'react';

function InstructorDashboard({ onLogout }) {
  return (
    <div>
      <h1>Instructor Dashboard</h1>
      {/* Display your courses here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default InstructorDashboard;

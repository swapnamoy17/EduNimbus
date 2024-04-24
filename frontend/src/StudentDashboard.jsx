// StudentDashboard.js
import React from 'react';

function StudentDashboard({ onLogout }) {
  return (
    <div>
      <h1>Student Dashboard</h1>
      {/* Display enrolled and recommended courses here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home'>
            <div className='homeButtons'>
                <div className="header-logo">
                    <img src="/edu-nimbus.png" alt="EduNimbus Logo" />
                    <span className="header-title">EduNimbus</span>
                </div>
                <h3>Welcome</h3>
                <button onClick={() => navigate('/signup')}>
                    Signup
                </button>
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Home;

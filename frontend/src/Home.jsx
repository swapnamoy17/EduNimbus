import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home'>
            <h3>Welcome</h3>
            <div className='homeButtons'>
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

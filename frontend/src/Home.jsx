import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const Navigate = useNavigate();
    return (
        <>
            <div className='home'>
                <h3>Welcome</h3>
                <div className='homeButtons'>
                    <button style={{margin:'10px'}} variant='contained' onClick={()=>Navigate('/signup')}>
                        Signup
                    </button>
                    <button style={{margin:'10px'}} variant='contained' onClick={()=>Navigate('/login')}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home

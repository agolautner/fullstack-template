import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../providers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const {auth, token, logout} = useAuth();
    const nav = (path) => {
        console.log('rerouting'); //any logic we want to run before rerouting
        navigate(path);
    }
    return (
        <nav className='navbar' style={{backgroundColor: 'gray', display: 'flex', justifyContent: 'space-between'}}>
            <div>
                {/* we can call the navigate function directly */}
                <button onClick={() => navigate('/')}>HOME</button>
                <button onClick={() => navigate('/about')}>ABOUT</button>
                {/* or implement a function which allows for logic before rerouting */}
                <button onClick={() => nav('/profile')}>PROFILE</button>
            </div>
            <div>
                {token ? <button onClick={logout}>LOGOUT</button> : (
                    <>
                        <button onClick={() => auth('google')}>GOOGLE LOGIN</button>
                        <button onClick={() => auth('oid')}>MY LOGIN</button>
                    </>
                )}
            </div>
        </nav>
  )
}

export default Navbar
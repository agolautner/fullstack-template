import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { register, user, auth } = useAuth();

    useEffect(() => {
        console.log(user);
        if(user.userId) navigate('/profile')
    }, [user, navigate])

  return (
    <>
        <div>Register</div>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='choose a username'/>
        <button onClick={() => register(username)}>register</button>
        <hr />
        <h1>OR!</h1>
        <hr />
        <button onClick={() => auth('google')}>google</button>
        <button onClick={() => auth('oid')}>oid</button>
    </>
  )
}

export default Register
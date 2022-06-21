import React, {useEffect, useState} from 'react';
import { oidApi } from '../api/oidApi';

const Home = () => {
    const api = oidApi();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

    }

    const signup = async () => {
        const response = await api.post('user/signup', {
            username, password
        })
        if (!response) return alert('network error!');
        console.log(response.status);
        if (response.status !== 200) return alert('error!');
        alert('success!!')
    }

    return (
        <div>
            <h1>Home</h1>
            <input placeholder='Username' type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={login}>LOGIN</button>
            <button onClick={signup}>SIGNUP</button>
        </div>
  )
}

export default Home
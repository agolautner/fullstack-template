import React, {useEffect, useState} from 'react';
import { oidApi } from '../api/oidApi';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null)

    const api = oidApi();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [client, setClient] = useState(null);
    const [redirectUri, setRedirectUri] = useState(null);

    const login = async () => {
        const response = await api.post('user/login', {
            username, password, client, redirectUri
        })
        if (!response) return alert('network error!');
        if (response.status !== 200) return alert('error!')
        const code = response.data.code;
        window.location.href = redirectUri + "?code=" + code;
    }

    const signup = async () => {
        const response = await api.post('user/signup', {
            username, password
        })
        if (!response) return alert('network error!');
        console.log(response.status);
        if (response.status !== 200) return alert('error!');
        alert('success!!');
        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        const _client = searchParams.get('client_id');
        const _redirect_uri = searchParams.get('redirect_uri');
        if (!_client) {
            return setError('Missing params - client_id')
        }
        if (!_redirect_uri) {
            return setError('Missing params - redirect_uri')
        }
        setClient(_client);
        setRedirectUri(_redirect_uri);
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {
                error && <div>{error}</div>
            }
            {
                !error && (
                    <div>
                        <input placeholder='Username' type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <button onClick={login}>LOGIN</button>
                        <button onClick={signup}>SIGNUP</button>
                    </div>
                )
            }
        </div>
  )
}

export default Home
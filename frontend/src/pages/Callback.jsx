import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Callback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const pathVariables = useParams();

    useEffect(() => {
        const loginWithCode = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            if(code) await login(code, pathVariables.provider);
            navigate('/profile');
        }
        loginWithCode();
        // eslint-disable-next-line
    }, [])

    return (
        <div>

        </div>
    )
}

export default Callback
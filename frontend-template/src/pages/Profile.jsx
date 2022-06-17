import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import { useAuth } from '../providers/auth';

const Profile = () => {
    const { value, increment, decrement } = useCounter(Profile);

    const { 
        value: globalValue,
        increment: globalIncrement, 
        decrement: globalDecrement 
    } = useGlobalCounter();
    const { token } = useAuth();

    return (
        <>
            <div>Profile</div>
            <p>{token ? 'logged in' : 'anonymous user'}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <p>{value}</p>
            <button onClick={globalDecrement}>-</button>
            <button onClick={globalIncrement}>+</button>
            <p>{globalValue}</p>
        </>
  )
}

export default Profile
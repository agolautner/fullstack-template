import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import { useAuth } from '../providers/auth';
import { useEffect } from 'react';

const Home = () => {
    const { value, increment, decrement } = useCounter(Home);
    const { 
        value: globalValue,
        increment: globalIncrement, 
        decrement: globalDecrement 
    } = useGlobalCounter();

    const { auth, token } = useAuth();

    return (
        <>
            <div>Home</div>
            <p>{token ? 'logged in' : 'anonymous user'}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <p>{value}</p>
            <button onClick={globalDecrement}>-</button>
            <button onClick={globalIncrement}>+</button>
            <p>{globalValue}</p>
            
            {token ? 'welcome!' : (
                <>
                    <button onClick={() => auth('google')}>Login with Google</button>
                    <button onClick={() => auth('oid')}>Login with my oID</button>
                </>
            )}
        </>
  )
}

export default Home
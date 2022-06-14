import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';

const Profile = () => {
    const { value, increment, decrement } = useCounter();
    const { 
        value: globalValue,
        increment: globalIncrement, 
        decrement: globalDecrement 
    } = useGlobalCounter();

    return (
        <>
            <div>Profile</div>
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
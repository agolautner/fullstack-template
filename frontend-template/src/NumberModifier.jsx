import React from 'react'
import { useCounter } from './CounterProvider';
import NumberPresenter from './NumberPresenter';

const NumberModifier = () => {
    const {increment, decrement} = useCounter();
    return (
        <div>
            <h4>NumberModifier</h4>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>

            <NumberPresenter/>
        </div>
  )
}

export default NumberModifier
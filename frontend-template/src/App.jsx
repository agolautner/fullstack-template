import './App.css';
import NumberModifier from './NumberModifier';
import { useCounter } from './CounterProvider';
import NumberPresenter from './NumberPresenter';

function App() {
  const {value, increment, decrement} = useCounter();
  return (
      <div className="App">
        <h2>Counter</h2>
        <button onClick={increment}>+</button>
        <p>{value}</p>
        <button onClick={decrement}>-</button>
        <NumberPresenter />
        <NumberModifier/>
      </div>
  );
}

export default App;

import {
  useCounterStateHook,
  useCounterTextHook,
} from "../context/counterContext";

const Counter = () => {
  const { count, increment, decrement } = useCounterStateHook();
  const { text, handleChange } = useCounterTextHook();
  return (
    <div>
      <h2>Counter is: {count}</h2>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <br />
      {text.length > 0 && <h4>Input is {text}</h4>}
      <input type="text" onChange={handleChange} />
    </div>
  );
};
export default Counter;

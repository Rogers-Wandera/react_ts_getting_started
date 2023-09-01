import React, { ReactNode, useReducer } from "react";

const initial_state = {
  count: 0,
  text: "",
};

const counter_types = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  INPUT_TEXT: "INPUT_TEXT",
};

type counter_reducer_types = {
  type: keyof typeof counter_types;
  payload?: string;
};

const reducer = (
  state: typeof initial_state,
  action: counter_reducer_types
): typeof initial_state => {
  switch (action.type) {
    case counter_types.DECREMENT:
      return { ...state, count: state.count - 1 };
    case counter_types.INCREMENT:
      return { ...state, count: state.count + 1 };
    case counter_types.INPUT_TEXT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error("unknown type");
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initial_state);

  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT_TEXT", payload: e.target.value });
  };
  return (
    <div>
      <h2>Counter is: {state.count}</h2>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <br />
      {state.text.length > 0 && <h4>Input is {state.text}</h4>}
      <input type="text" onChange={handleChange} />
    </div>
  );
};
export default Counter;

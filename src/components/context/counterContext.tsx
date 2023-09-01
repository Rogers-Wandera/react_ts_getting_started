import React, { useContext, useReducer } from "react";

type initialState = {
  count: number;
  text: string;
};

export const initial_state: initialState = {
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
  state: initialState,
  action: counter_reducer_types
): initialState => {
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

const useCounterContext = (initial_state: initialState) => {
  const [state, dispatch] = useReducer(reducer, initial_state);

  const increment = React.useCallback(
    () => dispatch({ type: "INCREMENT" }),
    []
  );
  const decrement = React.useCallback(
    () => dispatch({ type: "DECREMENT" }),
    []
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "INPUT_TEXT", payload: e.target.value });
    },
    []
  );
  return {
    state,
    increment,
    decrement,
    handleChange,
  };
};

type UseCounterContextType = ReturnType<typeof useCounterContext>;

const initContextState: UseCounterContextType = {
  state: initial_state,
  increment: () => {},
  decrement: () => {},
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
  React.createContext<UseCounterContextType>(initContextState);

type childrenType = {
  children: React.ReactElement;
};

export const CounterProvider = ({
  children,
  ...initial_state
}: childrenType & initialState): React.ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initial_state)}>
      {children}
    </CounterContext.Provider>
  );
};

type useCounterStateHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStateHook = (): useCounterStateHookType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

type useCounterTextHookType = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterTextHook = (): useCounterTextHookType => {
  const {
    state: { text },
    handleChange,
  } = useContext(CounterContext);
  return { text, handleChange };
};

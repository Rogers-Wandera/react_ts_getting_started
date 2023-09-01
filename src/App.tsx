import {
  CounterProvider,
  initial_state,
} from "./components/context/counterContext";
import Counter from "./components/reducers/counter";

function App() {
  return (
    <>
      <CounterProvider count={initial_state.count} text={initial_state.text}>
        <Counter />
      </CounterProvider>
    </>
  );
}

export default App;

import { useState } from "react";
import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";

const namesArray: string[] = ["Roger", "Ben", "Cathy", "Wandera"];
const arrayObjects: { name: string }[] = [
  { name: "Roger" },
  { name: "Ben" },
  { name: "Cathy" },
];

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <Heading title="Hello World" />
      <Section title="Hello My People">Hello from the children</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={namesArray} render={(item) => <span>{item}</span>} />
      <List items={arrayObjects} render={(item) => <h5>{item.name}</h5>} />
    </>
  );
}

export default App;

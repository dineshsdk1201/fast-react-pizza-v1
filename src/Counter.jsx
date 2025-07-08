import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
//1. Create a context
const CounterContext = createContext();
//2. Create parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  function increase() {
    setCount((c) => c + 1);
  }
  function decrease() {
    setCount((c) => c - 1);
  }
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

//3. Creating Child components
function Lable({ children }) {
  return <span>{children}</span>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={() => increase()}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={() => decrease()}>{icon}</button>;
}
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}
//4.Adding child components as properties to parent components
Counter.lable = Lable;
Counter.decrease = Decrease;
Counter.increase = Increase;
Counter.count = Count;
export default Counter;

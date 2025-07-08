import Counter from "./Counter"


function App() {
  return (
    <div>
      <Counter>
      <Counter.lable>Counter</Counter.lable>
      <Counter.decrease icon="➖"/>
      <Counter.count/>
      <Counter.increase icon="➕"/>
      </Counter>
    </div>
  )
}

export default App

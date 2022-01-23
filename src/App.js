import React, {useEffect, useState} from "react";
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [kossie, setKossie] = useState(0);
    useEffect(() => {
      console.log('effect')
      console.log(count);
    }, [count, kossie])
    useEffect(() => {
      console.log('first effect')
      
    }, [])

    const increment= () => {
      setCount(count + 1);
    };
  
    console.log('rendering');
    
  return (
    <div className="App">
      <h1>My study!!!!!</h1>
      <div>{count}</div>
      <button onClick={increment}>Click</button>
      <button onClick={() => setKossie(kossie + 1)}>Click1</button>
    </div>
  );
}

export default App;

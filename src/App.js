import React, {useState} from "react";
import './App.css';

function App() {
  const { username, setUsername} = useState('');
  const { password, setPassword} = useState('')
  const onSubmit = (event) => {
    //alert("submit");
    //submit 같은 경우는 언제나 동작 후 reflash가 동작하는데
    //preventDefault()로 reflash 동작을 막음
    event.preventDefault();
    console.log(password);
    console.log(username);
    
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input placeholder="name" 
          value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
        <input placeholder="password" 
        value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
        <button type="submit">Login</button>
        </form>
    </div>
  );
}

export default App;

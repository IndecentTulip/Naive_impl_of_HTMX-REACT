import './Main.css';
import { useState } from 'react';

const Main = () => {
  // useState creates a piece of state called "count"
  const [count, setCount] = useState(0);

  // This function updates the count when button is clicked
  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React State Update</h1>
      <p>The count is: <strong>{count}</strong></p>
      <button onClick={handleClick}>Increment</button>

      <div>
        <p>shadow DOM: </p>
        <demo-1 message='DEMO'></demo-1>
      </div>
    </div>

  );
}

export default Main;


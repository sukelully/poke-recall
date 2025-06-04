import { useState } from 'react';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(prev => prev + 1);
  }

  return (
    <>
      <div className="bg-teal-300 w-screen h-screen flex flex-col items-center justify-center gap-4">
        <button className='bg-indigo-900 text-white font-semibold p-2 rounded-md' onClick={increaseCount}>Increase count</button>
        <span>{count}</span>
      </div>
    </>
  );
}

export default App;

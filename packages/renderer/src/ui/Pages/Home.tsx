import * as React from 'react';
import {useState} from 'react';
import {Player} from '/@/features/Player';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  function addCount() {
    setCount(count => count + 1);

    if (count == 10) {
      Player.unlocked = true;
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <p>Vite + React + TypeScript</p>
        <p>
          <button onClick={() => addCount()}>Count: {count}</button>
        </p>
      </header>
    </div>
  );
};

export default Home;

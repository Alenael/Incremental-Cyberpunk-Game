import * as React from 'react';
import {useState} from 'react';
import {useMenus} from '/@/context/MenusContext';
import Player from '/@/features/Player';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const {updateVisible} = useMenus();

  function addCount() {
    setCount(count => count + 1);

    if (count == 10) {
      Player.unlocked = true;
      updateVisible();
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

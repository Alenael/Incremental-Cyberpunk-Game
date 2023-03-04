import * as React from 'react';
import {saveObject} from '../../features/save_system/SaveManager';
import {deleteGame} from '/@/features/save_system/db';
import {useRender} from '/@/hooks/useRender';

const DevMenu: React.FC = () => {
  useRender();

  return (
    <div>
      {JSON.stringify(saveObject)}
      <button onClick={() => saveObject.saveGame()}>Save Game</button>
      <button onClick={() => deleteGame()}>Delete Game</button>
    </div>
  );
};

export default DevMenu;

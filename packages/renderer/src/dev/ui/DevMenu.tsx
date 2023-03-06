import {Button} from '@chakra-ui/react';
import * as React from 'react';
import {saveObject} from '../../features/save_system/SaveManager';
import {deleteGame, load} from '/@/features/save_system/db';
import {useRender} from '/@/hooks/useRender';

const DevMenu: React.FC = () => {
  useRender();

  return (
    <div>
      {JSON.stringify(saveObject)}
      <Button
        onClick={() => saveObject.saveGame()}
        variant="primary"
      >
        Save Game
      </Button>
      <Button
        onClick={() => load()}
        variant="secondary"
        size="md"
      >
        Load Game
      </Button>
      <Button
        onClick={() => deleteGame()}
        size="lg"
      >
        Delete Game
      </Button>
    </div>
  );
};

export default DevMenu;

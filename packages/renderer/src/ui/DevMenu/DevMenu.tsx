import * as React from 'react';

import {Button} from '@chakra-ui/react';

import {saveObject} from '../../features/save/SaveManager';
import {deleteGame, load} from '../../features/save/db';
import {useRender} from '/@/hooks/useRender';
import {Player} from '/@/player';
import {Work} from '../../features/tasks/Work';

const DevMenu: React.FC = () => {
  useRender();

  return (
    <div>
      {JSON.stringify(saveObject)}
      <br />
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
      <Button onClick={() => Player.startTask(new Work())}>Start Task</Button>
      <Button onClick={() => Player.finishTask(true)}>Stop Task</Button>
    </div>
  );
};

export default DevMenu;

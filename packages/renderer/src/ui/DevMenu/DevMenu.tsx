import * as React from 'react';

import {Box, Button, VStack} from '@chakra-ui/react';

import {saveObject} from '/@/features/save/SaveManager';
import {deleteGame, load} from '/@/features/save/db';
import {useRender} from '/@/hooks/useRender';
import {Player} from '/@/player';
import {Work} from '/@/features/tasks/Work';
import {showMessage} from '/@/ui/Components/Modal';

const DevMenu: React.FC = () => {
  useRender();

  return (
    <Box>
      {JSON.stringify(saveObject)}
      <br />
      <VStack>
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
        <Button
          onClick={() => {
            showMessage(<>MODAL!</>);
            showMessage(<>MODAL!</>);
            showMessage(<>MODAL 2!</>);
            showMessage(<>MODAL 3!</>);
            showMessage(<>MODAL 4!</>);
            showMessage(<>MODAL 5!</>);
          }}
        >
          Show Modal!
        </Button>
      </VStack>
    </Box>
  );
};

export default DevMenu;

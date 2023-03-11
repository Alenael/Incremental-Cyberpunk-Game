import {Box, Button, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';

import {Loading} from './Loading';
import {deleteGame} from '/@/features/save/db';
import {loadData} from '/@/features/save/LoadManager';

export function Start(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <Loading />
  ) : (
    <Box>
      Start
      <VStack>
        <Button
          onClick={() => {
            setLoaded(true);
            loadData();
          }}
        >
          Start Game
        </Button>
        <Button>Export Save</Button>
        <Button>Import Save</Button>
        <Button onClick={deleteGame}>Delete Save</Button>
      </VStack>
    </Box>
  );
}

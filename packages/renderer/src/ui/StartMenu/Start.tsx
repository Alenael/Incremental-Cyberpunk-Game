import {Button, HStack} from '@chakra-ui/react';
import React, {useState, lazy} from 'react';

import {Loading} from './Loading';
const NewGame = lazy(() => import('./NewGame'));

export function Start(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);

  return loaded ? (
    <Loading />
  ) : (
    <div>
      {showNewGame ? (
        <NewGame
          setLoaded={setLoaded}
          setShowNewGame={setShowNewGame}
        />
      ) : (
        <div>
          Start
          <br />
          <HStack spacing="24px">
            <Button onClick={() => setShowNewGame(true)}>New Game</Button>
            <Button onClick={() => setLoaded(true)}>Continue - Profile Name</Button>
          </HStack>
        </div>
      )}
    </div>
  );
}

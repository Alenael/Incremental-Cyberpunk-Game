import React, {useEffect, useState} from 'react';
import {Box, Spinner} from '@chakra-ui/react';

import {Engine} from '/@/Engine';
import {load} from '/@/features/save/db';
import GameRoot from '/@/ui/GameMenu/GameRoot';

export function Loading(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [maxWaitDone, setmaxWaitDone] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      if (!loaded) setmaxWaitDone(true);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await load()
        .then(saveString => {
          Engine.load(saveString);
          setLoaded(true);
        })
        .catch(reason => {
          Engine.load();
          setReason(reason);
          setLoaded(true);
        });
    };

    loadData();
  }, []);

  return !loaded && maxWaitDone ? (
    <Box>
      Error Loading!
      {reason}
    </Box>
  ) : loaded ? (
    <GameRoot />
  ) : (
    <Box>
      Loading
      <Spinner size="xl" />
    </Box>
  );
}

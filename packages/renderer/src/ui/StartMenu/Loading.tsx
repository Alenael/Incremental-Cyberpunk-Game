import React, {useEffect, useState} from 'react';
import {Box, Spinner} from '@chakra-ui/react';

import GameRoot from '/@/ui/GameMenu/GameRoot';
import {LoadState} from '/@/features/save/LoadManager';

export function Loading(): React.ReactElement {
  const [loaded, setLoaded] = useState(LoadState.Loaded);
  const [error, setError] = useState(LoadState.Error);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      if (LoadState.Error) {
        setError(true);
        setReason(LoadState.ErrorReason);
        clearInterval(id);
      }
      if (LoadState.Loaded) {
        setLoaded(true);
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  return error ? (
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

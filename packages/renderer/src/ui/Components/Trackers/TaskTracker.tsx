import {Box, Button} from '@chakra-ui/react';
import React from 'react';
import {useEffect, useState} from 'react';
import {CONSTANTS} from '/@/Constants';
import {Player} from '/@/player';

export function TaskTracker(): React.ReactElement {
  const [enabled, setEnabled] = useState(Player.currentTask === null);
  const [task, setTask] = useState(Player.currentTask?.type);
  const [cycles, setCycles] = useState(Player.currentTask?.cyclesElapsed);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Player.currentTask !== null) {
        setEnabled(true);
        setTask(Player.currentTask.type);
        setCycles(Player.currentTask.cyclesElapsed);
      } else {
        setEnabled(false);
      }
    }, CONSTANTS.TRIPLE_TIME);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) return <></>;

  return (
    <Box
      borderColor={'sienna.500'}
      border={'2px'}
    >
      <h1>
        {task} - {cycles}
      </h1>
      <Button
        size="xs"
        onClick={() => Player.finishTask(true)}
      >
        Stop
      </Button>
    </Box>
  );
}

import React, {useState} from 'react';

import {Text, Box, Collapse, IconButton, HStack} from '@chakra-ui/react';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {TaskTracker} from './TaskTracker';

interface TrackerProps {
  children: (
    parentOpen: boolean,
  ) => JSX.Element[] | JSX.Element | React.ReactElement[] | React.ReactElement;
}

export function Tracker({children}: TrackerProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      borderColor={'sienna.500'}
      border={'2px'}
      flexDirection={'column'}
      display={'flex'}
      justifyContent={'flex-end'}
      bg={'smoke.800'}
    >
      <HStack>
        <Text flexGrow={1}>Overview</Text>
        <IconButton
          onClick={() => setOpen(!open)}
          icon={<ChevronDownIcon />}
          aria-label={'Tracker Expand and Collapse Button'}
          bg={'smoke.800'}
        ></IconButton>
      </HStack>
      <Collapse in={open}>{children(open)}</Collapse>
      <TaskTracker />
    </Box>
  );
}

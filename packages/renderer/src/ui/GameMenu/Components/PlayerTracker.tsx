import React from 'react';

import {Button, Table, Tbody, Th, Tr} from '@chakra-ui/react';
import {saveObject} from '/@/features/save/SaveManager';

interface IProps {
  parentOpen: boolean;
}

export function PlayerTracker({parentOpen}: IProps): React.ReactElement {
  return (
    <>
      <Table sx={{display: 'block', m: 1}}>
        <Tbody>
          <Tr>
            <Th>Test Info</Th>
          </Tr>
          <Tr>
            <Th>Test Info</Th>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={() => saveObject.saveGame()}>Save</Button>
    </>
  );
}

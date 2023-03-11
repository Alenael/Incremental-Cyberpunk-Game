import React, {useEffect, useState} from 'react';

import {Button, Table, Tbody, Th, Tr} from '@chakra-ui/react';
import {saveObject} from '/@/features/save/SaveManager';
import {Player} from '/@/player';
import {CONSTANTS} from '/@/Constants';

interface IProps {
  parentOpen: boolean;
}

export function PlayerTracker({parentOpen}: IProps): React.ReactElement {
  const [money, setMoney] = useState(Player.money.toString());

  useEffect(() => {
    if (!parentOpen) return;
    const interval = setInterval(() => {
      setMoney(Player.money.toString());
    }, CONSTANTS.TRIPLE_TIME);
    return () => clearInterval(interval);
  }, [parentOpen]);

  return (
    <>
      <Table sx={{display: 'block', m: 1}}>
        <Tbody>
          <Tr>
            <Th>Money: {money}</Th>
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

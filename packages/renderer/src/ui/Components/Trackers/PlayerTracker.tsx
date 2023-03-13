import React, {useEffect, useState} from 'react';

import {Button, Table, Tbody, Th, Tr} from '@chakra-ui/react';
import {saveObject} from '/@/features/save/SaveManager';
import {Player} from '/@/player';
import {CONSTANTS} from '/@/Constants';
import {toMoney} from '/@/utils/BigNumberConfig';

interface IProps {
  parentOpen: boolean;
}

const playerMoney = () => toMoney(Player.money);

export function PlayerTracker({parentOpen}: IProps): React.ReactElement {
  const [money, setMoney] = useState(playerMoney);

  useEffect(() => {
    if (!parentOpen) return;
    const interval = setInterval(() => {
      setMoney(playerMoney);
    }, CONSTANTS.TRIPLE_TIME);
    return () => clearInterval(interval);
  }, [parentOpen]);
  return (
    <>
      <Table sx={{display: 'block', m: 1}}>
        <Tbody>
          <Tr>
            <Th textTransform={'none'}>Money: {money}</Th>
          </Tr>
          <Tr>
            <Th textTransform={'none'}>Test Info</Th>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={() => saveObject.saveGame()}>Save</Button>
    </>
  );
}

import React, {useEffect, useState} from 'react';
import {Spinner} from '@chakra-ui/react';

import {load} from '../../features/save/db';
import {Engine} from '/@/Engine';
import GameRoot from '/@/ui/GameMenu/GameRoot';

export function Loading(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await load()
        .then(saveString => {
          Engine.load(saveString);
          setLoaded(true);
        })
        .catch(reason => {
          console.error(reason);
          Engine.load();
          setLoaded(true);
        });
    };

    loadData();
  }, []);

  return loaded ? (
    <GameRoot />
  ) : (
    <div>
      Loading
      <Spinner size="xl" />
    </div>
  );
}

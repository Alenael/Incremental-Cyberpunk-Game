import React, {useEffect, useState} from 'react';
import {load} from '../db';
import {Engine} from '../../../Engine';
import GameRoot from '/@/ui/GameRoot';

export function LoadingScreen(): React.ReactElement {
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

  return loaded ? <GameRoot /> : <div>Loading</div>;
}

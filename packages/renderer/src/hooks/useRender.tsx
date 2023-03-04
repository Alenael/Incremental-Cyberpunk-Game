import {useEffect, useState} from 'react';
import {CONSTANTS} from '../Constants';

/**Simple Hook which will cause a component to rerender itself based on time provided or CONSTANTS.CYCLE_TIME by default */
export const useRender = (refreshTime: number = CONSTANTS.CYCLE_TIME) => {
  const setRerender = useState(false)[1];

  useEffect(() => {
    const id = setInterval(() => setRerender(old => !old), refreshTime);
    return () => clearInterval(id);
  }, []);
};

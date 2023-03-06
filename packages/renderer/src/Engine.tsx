import {CONSTANTS} from './Constants';
import {Player} from '/@/player';
import {loadGame} from '/@/features/save_system/SaveManager';

/** Purpose of the class is to create and endless loop of calls to the main game loop each time a frame is rendered to browser*/
export const Engine: {
  lastUpdate: number;
  updateGame: (numCycles?: number) => void;
  load: (saveString?: string) => void;
  start: () => void;
} = {
  lastUpdate: new Date().getTime(),
  updateGame: (numCycles = 1) => {
    const time = numCycles * CONSTANTS.CYCLE_TIME;
    Player.totalPlayTime += time;
  },
  load: (saveString = '') => {
    if (loadGame(saveString)) {
      Engine.lastUpdate = new Date().getTime();
      const lastUpdate = Player.lastUpdate;
      const timeOffline = Engine.lastUpdate - lastUpdate;
      const numCyclesOffline = Math.floor(timeOffline / CONSTANTS.CYCLE_TIME);
      const time = numCyclesOffline * CONSTANTS.CYCLE_TIME;
      Player.totalPlayTime += time;
      Player.lastUpdate = Engine.lastUpdate;
      Engine.start();
    } else {
      Engine.start();
    }
  },
  start: () => {
    const thisUpdate = new Date().getTime();
    const diff = thisUpdate - Engine.lastUpdate;
    const offset = diff % CONSTANTS.CYCLE_TIME;
    if (diff > 0) {
      Engine.lastUpdate = thisUpdate - offset;
      Player.lastUpdate = Engine.lastUpdate;
      const numCycles = Math.floor(diff / CONSTANTS.CYCLE_TIME);
      Engine.updateGame(numCycles);
    }
    window.requestAnimationFrame(Engine.start);
  },
};

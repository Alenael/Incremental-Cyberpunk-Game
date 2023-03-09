import {CONSTANTS} from '/@/Constants';
import {Player} from '/@/features/player/Player';
import {loadGame} from '/@/features/save/SaveManager';

/** Purpose of the class is to create and endless loop of calls to the main game loop each time a frame is rendered to browser*/
export const Engine: {
  lastUpdate: number;
  updateGame: (numCycles?: number) => void;
  load: (saveString?: string) => void;
  start: () => void;
} = {
  lastUpdate: 0,

  /** Handles updating state for all required modules */
  updateGame: (numCycles = 1) => {
    Player.update(numCycles);
  },

  /** Hanldes Loading Save Data and starting Engine */
  load: (saveString = '') => {
    if (loadGame(saveString)) {
      Engine.lastUpdate = new Date().getTime();
      const timeOffline = Engine.lastUpdate - Player.lastUpdate;
      const numCycles = Math.floor(timeOffline / CONSTANTS.CYCLE_TIME);
      Player.lastUpdate = Engine.lastUpdate;
      Player.update(numCycles);
    }
    Engine.start();
  },

  /** Main Game Loop */
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

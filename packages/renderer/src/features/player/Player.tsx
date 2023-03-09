import {CONSTANTS} from '/@/Constants';

import type {IReviverValue} from '/@/utils/JSONReviver';
import {Generic_fromJSON, Generic_toJSON, Reviver} from '/@/utils/JSONReviver';

import * as PlayerTask from './PlayerTask';
import type {Task} from '/@/features/tasks/Task';

/** Holds reference to all data for our player includeing functions for the player to perform */
export class PlayerObject {
  //Data
  unlocked = false;
  totalPlayTime = 0;
  lastUpdate = 0;
  lastSave = 0;
  currentTask: Task | null = null;

  //Outsourced Methods
  startTask = PlayerTask.startTask;
  processTask = PlayerTask.processTask;
  finishTask = PlayerTask.finishTask;

  /** Handles updating the state of the player object with each frame */
  update(numCycles: number) {
    const time = numCycles * CONSTANTS.CYCLE_TIME;
    Player.totalPlayTime += time;
    Player.processTask(numCycles);
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('PlayerObject', this);
  }

  static fromJSON(value: IReviverValue): PlayerObject {
    return Generic_fromJSON(PlayerObject, value.data);
  }
}

Reviver.constructors.PlayerObject = PlayerObject;

export let Player = new PlayerObject();

/** Loads the Player Object from the JSON save */
export function loadPlayer(playerObject: string) {
  Player = JSON.parse(playerObject, Reviver);
}

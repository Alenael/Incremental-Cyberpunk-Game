import {CONSTANTS} from '/@/Constants';

import type {IReviverValue} from '/@/utils/JSONReviver';
import {Generic_fromJSON, Generic_toJSON, Reviver} from '/@/utils/JSONReviver';
import {BFN} from '/@/utils/BigNumber/BigNumberOverride';

import * as PlayerTask from './PlayerTask';
import type {Task} from '/@/features/tasks/Task';
import type {MoneySource} from '/@/features/trackers/MoneySourceTracker';
import {MoneySourceTracker} from '/@/features/trackers/MoneySourceTracker';

/** Holds reference to all data for our player includeing functions for the player to perform */
export class PlayerObject {
  //Data
  unlocked = false;
  money = new BFN(0);
  totalPlayTime = 0;
  lastUpdate = 0;
  lastSave = 0;
  currentTask: Task | null = null;
  moneySource: MoneySourceTracker = new MoneySourceTracker();

  //Outsourced Methods
  startTask = PlayerTask.startTask;
  processTask = PlayerTask.processTask;
  finishTask = PlayerTask.finishTask;

  gainMoney(source: MoneySource) {
    this.money = this.money.plus(source.amount);
    this.moneySource.record(source);
  }

  /** Handles updating the state of the player object with each frame */
  update(numCycles: number) {
    const time = numCycles * CONSTANTS.CYCLE_TIME;
    this.totalPlayTime += time;
    this.processTask(numCycles);
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('PlayerObject', this);
  }

  static fromJSON(value: IReviverValue): PlayerObject {
    const player = Generic_fromJSON(PlayerObject, value.data);
    return player;
  }
}

Reviver.constructors.PlayerObject = PlayerObject;

export let Player = new PlayerObject();

/** Loads the Player Object from the JSON save */
export function loadPlayer(playerObject: string) {
  Player = JSON.parse(playerObject, Reviver);
}

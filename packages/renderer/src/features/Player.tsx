import type {IReviverValue} from '../utils/JSONReviver';
import {Reviver} from '../utils/JSONReviver';
import {Generic_fromJSON, Generic_toJSON} from '../utils/JSONReviver';

export class PlayerObject {
  unlocked = false;
  totalPlayTime = 0;
  lastUpdate = 0;
  lastSave = 0;

  toJSON(): IReviverValue {
    return Generic_toJSON('PlayerObject', this);
  }

  static fromJSON(value: IReviverValue): PlayerObject {
    return Generic_fromJSON(PlayerObject, value.data);
  }
}

Reviver.constructors.PlayerObject = PlayerObject;

export let Player = new PlayerObject();

export function loadPlayer(playerObject: string) {
  Player = JSON.parse(playerObject, Reviver);
  console.log(Player);
}

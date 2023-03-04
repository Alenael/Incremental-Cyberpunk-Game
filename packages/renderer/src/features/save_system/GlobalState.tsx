import {Player, loadPlayer} from '../Player';
import {CONSTANTS} from '/@/Constants';

/** Defines the global state of data used for Saving and Loading */
export class GlobalState {
  PlayerData = '';
  GameVersion = '';

  saveState() {
    this.PlayerData = JSON.stringify(Player);
    this.GameVersion = JSON.stringify(CONSTANTS.VERSION_NUMBER);
  }

  loadState(saveObj: any) {
    loadPlayer(saveObj.PlayerData);
  }
}

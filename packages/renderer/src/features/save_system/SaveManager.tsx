import {Player} from '/@/player';
import {save} from './db';
import type {IReviverValue} from '/@/utils/JSONReviver';
import {Generic_fromJSON, Generic_toJSON} from '/@/utils/JSONReviver';
import {Reviver} from '/@/utils/JSONReviver';
import {Buffer} from 'buffer';
import {GlobalState} from './GlobalState';
import {toast} from '/@/ui/theme/components/Toast';

/** Handles Saving and Loading the Game State to the DB and hanldes executing Migrations */
class GameSaveObject extends GlobalState {
  saveSuccess = () => toast({title: 'Save Succesfull!'});

  getSaveString(): string {
    this.saveState();
    const obj = JSON.stringify(this);
    return Buffer.from(obj).toString('base64');
  }

  saveGame(): Promise<void> {
    Player.lastSave = new Date().getTime();
    const saveString = this.getSaveString();

    return new Promise((resolve, reject) => {
      save(saveString)
        .then(() => {
          this.saveSuccess();
          return resolve();
        })
        .catch(err => {
          console.error(err);
          return reject();
        });
    });
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('GameSaveObject', this);
  }

  static fromJSON(value: IReviverValue): GameSaveObject {
    return Generic_fromJSON(GameSaveObject, value.data);
  }
}

function executeMigrations(version: number) {
  //Create Migrations Manager
  if (version <= 1) {
    //Execute some change here from Version 0 to 1
  }
}

function loadGame(saveString: string): boolean {
  if (!saveString) return false;
  saveString = Buffer.from(saveString, 'base64').toString();

  const saveObj = JSON.parse(saveString, Reviver);
  saveObject.loadState(saveObj);
  if (Object.prototype.hasOwnProperty.call(saveObj, 'VersionSave')) {
    try {
      const version = JSON.parse(saveObj.VersionSave, Reviver);
      executeMigrations(Number(version));
    } catch (e) {
      console.log(e);
    }
  }

  return true;
}

Reviver.constructors.GameSaveObject = GameSaveObject;

export {saveObject, loadGame};

const saveObject = new GameSaveObject();

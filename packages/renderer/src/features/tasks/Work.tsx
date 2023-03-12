import type {IReviverValue} from '/@/utils/JSONReviver';
import {Reviver, Generic_fromJSON, Generic_toJSON} from '/@/utils/JSONReviver';
import {Task, TaskType} from './Task';
import {Player} from '/@/player';

/** Simple Work task whih allows one to perform work for money */
export class Work extends Task {
  constructor() {
    super(TaskType.WORK);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    //Process money gains for player/affect the world
    Player.gainMoney(5000000.27); //Math.pow(cycles, 9.27));
    return false;
  }

  finish(canceled: boolean) {
    //Display Finished Modal
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('Work', this);
  }

  static fromJSON(value: IReviverValue): Work {
    return Generic_fromJSON(Work, value.data);
  }
}

Reviver.constructors.Work = Work;

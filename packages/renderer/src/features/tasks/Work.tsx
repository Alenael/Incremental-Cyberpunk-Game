import type {IReviverValue} from '/@/utils/JSONReviver';
import {Reviver, Generic_fromJSON, Generic_toJSON} from '/@/utils/JSONReviver';
import {BFN} from '/@/utils/BigNumber/BigNumberOverride';

import {Task, TaskType} from './Task';
import {Player} from '/@/player';

/** Simple Work task whih allows one to perform work for money */
export class Work extends Task {
  constructor() {
    super(TaskType.WORK);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    const amt = new BFN(cycles * 5000);
    Player.gainMoney({name: this.type, amount: amt});
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

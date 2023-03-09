import type {IReviverValue} from '../../utils/JSONReviver';
import {Reviver} from '../../utils/JSONReviver';
import {Generic_fromJSON} from '../../utils/JSONReviver';
import {Generic_toJSON} from '../../utils/JSONReviver';
import {Task, TaskType} from './Task';

/** Simple Work task whih allows one to perform work for money */
export class Work extends Task {
  constructor() {
    super(TaskType.WORK);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    //Process money gains for player/affect the world
    return false;
  }

  finish() {
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

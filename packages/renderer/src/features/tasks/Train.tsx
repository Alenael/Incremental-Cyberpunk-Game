import type {IReviverValue} from '../../utils/JSONReviver';
import {Reviver} from '../../utils/JSONReviver';
import {Generic_fromJSON} from '../../utils/JSONReviver';
import {Generic_toJSON} from '../../utils/JSONReviver';
import {Task, TaskType} from './Task';

/** Simple Train which can improve stats */
export class Train extends Task {
  constructor() {
    super(TaskType.CRIME);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    //Process stat gains
    return false;
  }

  finish() {
    //Display Finished Modal
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('Train', this);
  }

  static fromJSON(value: IReviverValue): Train {
    return Generic_fromJSON(Train, value.data);
  }
}

Reviver.constructors.Work = Train;
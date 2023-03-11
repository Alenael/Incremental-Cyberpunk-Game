import type {IReviverValue} from '/@/utils/JSONReviver';
import {Reviver, Generic_fromJSON, Generic_toJSON} from '/@/utils/JSONReviver';
import {Task, TaskType} from './Task';

/** Simple Train which can improve stats */
export class Train extends Task {
  constructor() {
    super(TaskType.TRAIN);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    //Process stat gains
    return false;
  }

  finish(canceled: boolean) {
    //Display Finished Modal
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('Train', this);
  }

  static fromJSON(value: IReviverValue): Train {
    return Generic_fromJSON(Train, value.data);
  }
}

Reviver.constructors.Train = Train;

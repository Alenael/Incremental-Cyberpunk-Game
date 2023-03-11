import type {IReviverValue} from '/@/utils/JSONReviver';
import {Reviver, Generic_fromJSON, Generic_toJSON} from '/@/utils/JSONReviver';
import {Task, TaskType} from './Task';

/** Simple Crime used to commit crimes in the world*/
export class Crime extends Task {
  constructor() {
    super(TaskType.CRIME);
  }

  process(cycles: number): boolean {
    this.cyclesElapsed += cycles;
    //Process money gains for player/affect the world
    return false;
  }

  finish(anceled: boolean) {
    //Display Finished Modal
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('Crime', this);
  }

  static fromJSON(value: IReviverValue): Crime {
    return Generic_fromJSON(Crime, value.data);
  }
}

Reviver.constructors.Crime = Crime;

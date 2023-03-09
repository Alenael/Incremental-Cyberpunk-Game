import type {IReviverValue} from '/@/utils/JSONReviver';

/** All available Task Types */
export enum TaskType {
  WORK = 'WORK',
  CRIME = 'CRIME',
}

/** Base of all Task's which perform actions over time until they finish */
export abstract class Task {
  type: TaskType;
  cyclesElapsed: number;

  constructor(type: TaskType) {
    this.type = type;
    this.cyclesElapsed = 0;
  }

  abstract process(cycles: number): boolean;
  abstract finish(cancelled: boolean): void;
  abstract toJSON(): IReviverValue;
}

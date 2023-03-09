import type {PlayerObject} from '/@/player';
import type {Task} from '../tasks/Task';

export function startTask(this: PlayerObject, task: Task): void {
  if (this.currentTask !== null) {
    this.currentTask.finish(true);
  }
  this.currentTask = task;
}

export function processTask(this: PlayerObject, cycles = 1) {
  if (this.currentTask === null) return;
  const finished = this.currentTask.process(cycles);
  if (finished) {
    this.finishTask(false);
  }
}

export function finishTask(this: PlayerObject, cancelled: boolean) {
  if (this.currentTask === null) return;
  this.currentTask.finish(cancelled);
  this.currentTask = null;
}

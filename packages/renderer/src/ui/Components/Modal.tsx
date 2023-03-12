import {AlertEvents} from './AlertManager';

export function showMessage(element: JSX.Element): void {
  AlertEvents.emit(element);
}

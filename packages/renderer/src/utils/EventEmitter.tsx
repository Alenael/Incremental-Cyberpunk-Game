//github.com/bitburner-official/bitburner-src/blob/f2e1a67ec1f41f3b844003b39937f5bb47bd1d54/src/utils/EventEmitter.ts
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Generic Event Emitter class following a subscribe/publish paradigm. */
export class EventEmitter<T extends any[]> {
  subscribers: {[key: string]: (...args: [...T]) => void | undefined} = {};

  subscribe(s: (...args: [...T]) => void): () => void {
    let uuid = uuidv4();
    while (this.subscribers[uuid] !== undefined) uuid = uuidv4();
    this.subscribers[uuid] = s;

    return () => {
      delete this.subscribers[uuid];
    };
  }

  emit(...args: [...T]): void {
    for (const s in this.subscribers) {
      const sub = this.subscribers[s];
      if (sub === undefined) continue;

      sub(...args);
    }
  }
}

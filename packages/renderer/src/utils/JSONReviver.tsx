/* From: https://github.com/danielyxie/bitburner/blob/dev/src/utils/JSONReviver.ts */

import {validateObject} from './Validator';

export interface IReviverValue {
  ctor: string;
  data: any;
}

// A generic "smart reviver" function.
// Looks for object values with a `ctor` property and
// a `data` property. If it finds them, and finds a matching
// constructor that has a `fromJSON` property on it, it hands
// off to that `fromJSON` function, passing in the value.
export function Reviver(key: string, value: IReviverValue | null): any {
  if (value == null) {
    return null;
  }

  if (
    typeof value === 'object' &&
    typeof value.ctor === 'string' &&
    typeof value.data !== 'undefined'
  ) {
    const ctor = Reviver.constructors[value.ctor];

    if (typeof ctor === 'function' && typeof ctor.fromJSON === 'function') {
      const obj = ctor.fromJSON(value);
      if (ctor.validationData !== undefined) {
        validateObject(obj, ctor.validationData);
      }
      return obj;
    }
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Reviver {
  export const constructors: {[key: string]: any} = {};
}

export function Generic_toJSON(
  ctorName: string,
  obj: Record<string, any>,
  keys?: string[],
): IReviverValue {
  if (!keys) {
    keys = Object.keys(obj);
  }

  const data: Record<string, unknown> = {};
  for (let index = 0; index < keys.length; ++index) {
    const key = keys[index];
    data[key] = obj[key];
  }
  return {ctor: ctorName, data: data};
}

export function Generic_fromJSON<T>(ctor: new () => T, data: any): T {
  const obj: any = new ctor();
  for (const name in data) {
    obj[name] = data[name];
  }
  return obj;
}

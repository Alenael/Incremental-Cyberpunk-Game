import type BigNumber from 'bignumber.js';
import {MoneyBN} from '/@/utils/BigNumberConfig';
import type {IReviverValue} from '/@/utils/JSONReviver';
import {Generic_fromJSON, Generic_toJSON, Reviver} from '/@/utils/JSONReviver';

export interface MoneySource {
  name: string;
  amount: BigNumber;
}

export class MoneySourceTracker {
  // eslint-disable-next-line @typescript-eslint/ban-types
  sources: MoneySource[] = [];
  total = new MoneyBN(0);

  record(source: MoneySource) {
    const s = this.sources.filter(s => s.name === source.name)[0];
    if (s === undefined) this.sources.push({name: source.name, amount: source.amount});
    else s.amount = s.amount.plus(source.amount);
    this.total = this.total.plus(source.amount);
  }

  toJSON(): IReviverValue {
    return Generic_toJSON('MoneySourceTracker', this);
  }

  static fromJSON(value: IReviverValue): MoneySourceTracker {
    return Generic_fromJSON(MoneySourceTracker, value.data);
  }
}

Reviver.constructors.MoneySourceTracker = MoneySourceTracker;

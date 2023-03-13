import BigNumber from 'bignumber.js';
import {Generic_toJSON, Reviver} from '/@/utils/JSONReviver';

/** Override the default BigNumber functionality to create our own BigNumber class
 * This allows us to implment some functions onto the object such as serialization/deserlization that is specific to the game
 */
export const BFN = BigNumber.clone();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Add Static Method to object to deserialize BFN
BFN.fromJSON = function fromJSON(value: IReviverValue): BFN {
  return new BFN({
    s: value.data['s'],
    e: value.data['e'],
    c: value.data['c'],
    _isBigNumber: true,
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Change function belonging to object to serialize BFN
BFN.prototype.toJSON = function toJSON(): IReviverValue {
  return Generic_toJSON('BFN', this);
};

Reviver.constructors.BFN = BFN;

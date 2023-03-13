import BigNumber from 'bignumber.js';
import type {IReviverValue} from './JSONReviver';
import {Reviver} from './JSONReviver';
import {Generic_toJSON} from './JSONReviver';

/** Translates a BigNumber into a few different strings depending on how large the value is
 * Values under 6 0's (Million) will print as normaly numbers: $1,000 $100,213 etc.
 * Values over 6 0's but under 30 (Million to Nonillion) return in format: 1.54m 1.56n 100.53t etc.
 * Values that5 fall outside of either of these return in exponential format: 1e31 2e52 3e165 etc.
 */
export function toMoney(bigNumber: BigNumber) {
  if (bigNumber.e !== null && bigNumber.e > 30) return bigNumber.toExponential(2);
  if (bigNumber.e !== null && bigNumber.e >= 6) return formatWithExponentName(bigNumber);
  return bigNumber.toFormat(2);
}

/** Transforms a Big Number into a simplier to read format:
 * 1,500,000,000 returns: $1.50b
 * 15,000,000,000 returns: $15.0b
 * 150,000,000,000 returns: $150.00b
 */
function formatWithExponentName(bigNumber: BigNumber): string {
  if (bigNumber.e === null) return 'INVALID';
  const [exponentName, exponentLength] = getExponentName(bigNumber.e - 2);
  let num = bigNumber.toFixed(0);
  const sliceLength = num.length - exponentLength;
  const next2 = num.slice(sliceLength, sliceLength + 2);
  num = num.slice(0, sliceLength);
  return `$${num}.${next2}${exponentName}`;
}

/** Returns the first Exponent Name which matches or is higher than the provided Exponent */
function getExponentName(exponent: number): [string, number] {
  for (const [key, value] of Object.entries(exponentValues)) {
    if (value >= exponent) return [key, value];
  }
  console.error(
    `Exponent ${exponent} provided did not match one of the Exponents in the list. Exponent List: ${exponentValues}`,
  );
  return ['INVALID', 0];
}

const exponentValues = {
  m: 6,
  b: 9,
  t: 12,
  q: 15,
  Q: 18,
  s: 21,
  S: 24,
  o: 27,
};

export const MoneyBN = BigNumber.clone({
  FORMAT: {
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: '',
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Add Static Method to object
MoneyBN.fromJSON = function fromJSON(value: IReviverValue): MoneyBN {
  return new MoneyBN({
    s: value.data['s'],
    e: value.data['e'],
    c: value.data['c'],
    _isBigNumber: true,
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Change function belonging to object
MoneyBN.prototype.toJSON = function toJSON(): IReviverValue {
  return Generic_toJSON('MoneyBN', this);
};

Reviver.constructors.MoneyBN = MoneyBN;

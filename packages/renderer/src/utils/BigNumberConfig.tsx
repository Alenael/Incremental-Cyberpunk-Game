import BigNumber from 'bignumber.js';

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

/** Returns the first Exponent Name which matches the provided Exponent*/
function getExponentName(exponent: number): [string, number] {
  for (const [key, value] of Object.entries(exponentValues)) {
    if (value >= exponent) return [key, value];
  }
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

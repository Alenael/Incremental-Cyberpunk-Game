import type BigNumber from 'bignumber.js';

/** Custom Format settings to output a number in Money Format - Only used for values under 1 Million */
const MoneyFormat = {
  prefix: '$',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

/** Translates a BigNumber into a few different strings depending on how large the value is
 * Values under 6 0's (Million) will print as normaly numbers: $1,000 $100,213 etc.
 * Values equal or over 6 0's but under 30 (Million to Nonillion) return in format: 1.54m 1.56n 100.53t etc.
 * Values that fall outside of either of these return in exponential format: 1e31 2e52 3e165 etc.
 */
export function toMoney(bigNumber: BigNumber) {
  if (bigNumber.e !== null && bigNumber.e > 30) return bigNumber.toExponential(2);
  if (bigNumber.e !== null && bigNumber.e >= 6)
    return formatWithExponentName(bigNumber, MoneyFormat);
  return bigNumber.toFormat(2, MoneyFormat);
}

/** Transforms a Big Number into a simplier to read format:
 * 1,500,000,000 returns: $1.50b
 * 15,000,000,000 returns: $15.0b
 * 150,000,000,000 returns: $150.00b
 * From Format you can pass a prefix or suffix - Rest of formatting does not apply yet
 */
function formatWithExponentName(bigNumber: BigNumber, format: BigNumber.Format): string {
  if (bigNumber.e === null) return 'INVALID';
  const [exponentName, exponentLength] = getExponentName(bigNumber.e - 2);
  let num = bigNumber.toFixed(0);
  const sliceLength = num.length - exponentLength;
  const next2 = num.slice(sliceLength, sliceLength + 2);
  num = num.slice(0, sliceLength);
  return `${format.prefix}${num}.${next2}${exponentName}${format.suffix}`;
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

/** Amount of exponents and the exponent name that belong to it */
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

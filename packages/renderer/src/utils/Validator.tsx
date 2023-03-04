/** From: https://github.com/danielyxie/bitburner/blob/dev/src/utils/Validator.ts */

export type ObjectValidator<T> = {
  [key in keyof T]?: ParameterValidator<T, keyof T>;
};

interface ParameterValidatorObject<Type, Key extends keyof Type> {
  default?: unknown;
  min?: number;
  max?: number;
  func?: (obj: Type, validator: ObjectValidator<Type>, key: Key) => void;
}
type ParameterValidatorFunction<Type, Key extends keyof Type> = (obj: Type, key: Key) => void;
type ParameterValidator<Type, Key extends keyof Type> =
  | ParameterValidatorObject<Type, Key>
  | ParameterValidatorFunction<Type, Key>;

export function validateObject<Type extends Record<string, unknown>, Key extends keyof Type>(
  obj: Type,
  validator: ObjectValidator<Type>,
): void {
  for (const key of Object.keys(validator) as Key[]) {
    const paramValidator = validator[key];
    if (paramValidator !== undefined) {
      if (typeof paramValidator === 'function') {
        paramValidator(obj, key);
      } else if (paramValidator.func !== undefined) {
        paramValidator.func(obj, validator, key);
      } else {
        if (typeof obj[key] !== typeof paramValidator.default) {
          obj[key] = paramValidator.default as Type[Key];
        }
        if (typeof obj[key] === 'number' && paramValidator.min !== undefined) {
          if (obj[key] < paramValidator.min) obj[key] = paramValidator.min as Type[Key];
        }
        if (typeof obj[key] === 'number' && paramValidator.max !== undefined) {
          if (obj[key] > paramValidator.max) obj[key] = paramValidator.max as Type[Key];
        }
      }
    }
  }
}

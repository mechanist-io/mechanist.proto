import { Transform } from 'class-transformer';

export const TransformEmptyToNull = () =>
  Transform(({ value }) => (value === '' ? null : value));

import { SortOrder } from 'mongoose';

export type SortArgument<T> = {
  readonly [K in keyof T]?: SortOrder;
};

import { Types } from 'mongoose';

export type PlainObject<T extends { readonly id: string }> = Omit<T, 'id'> & {
  readonly __v: number;
  readonly _id: Types.ObjectId;
};

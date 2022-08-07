export type DeepPartial<T extends Object> = T extends Array<infer U>
  ? DeepPartialObject<U>[]
  : T extends Object
  ? DeepPartialObject<T>
  : T;

type DeepPartialObject<T extends Object> = Partial<{
  [P in keyof T]: T[P] extends Function
    ? T[P]
    : T[P] extends Array<infer U>
    ? DeepPartial<U>[]
    : T[P] extends Object
    ? DeepPartial<T[P]>
    : T[P];
}>;

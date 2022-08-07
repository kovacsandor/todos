export type Validation<T extends Record<string, any>> = {
  readonly [K in keyof T & string]?: readonly string[];
};

export type NumberKeysOf<T> = {
  [Key in keyof T]: T[Key] extends number ? Key : never;
}[keyof T];

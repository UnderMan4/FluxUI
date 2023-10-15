export type DeepPartial<T> = {
   [P in keyof T]?: T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T[P] extends ReadonlyArray<infer V>
      ? ReadonlyArray<DeepPartial<V>>
      : DeepPartial<T[P]>;
};

export type PickByKey<T, U> = U extends (infer R)[]
  ? Pick<T, R extends keyof T ? R : never>
  : U extends keyof T
  ? T[U]
  : T;

export type PickByKeyPartial<T, U> = U extends (infer R)[]
  ? Partial<Pick<T, R extends keyof T ? R : never>>
  : U extends keyof T
  ? T[U]
  : Partial<T>;

export type NullDefault<Key, True, False> = undefined extends Key
  ? True
  : False;

export type HandlerByTypeNull<
  T,
  K extends keyof T,
  U extends undefined | K | K[]
> = undefined extends U
  ? T
  : U extends K[]
  ? Partial<T>
  : U extends keyof T
  ? T[U]
  : Partial<T>;

export type HandlerByType<
  T,
  K = keyof T,
  U = undefined | K | K[]
> = U extends K[] ? Partial<T> : U extends keyof T ? T[U] : Partial<T>;

export type HandlerByTypeMap<T, K extends keyof T, U = K[]> =
  | T
  | Partial<T>
  | U extends (infer R)[]
  ? Pick<T, R extends keyof T ? R : never>
  : Partial<T>;

export type StoreEvent<T, K = keyof T, U = undefined | K | K[]> = {
  type: U;
  handler: (state: HandlerByType<T, K, U>) => void;
};

export type SubscriptionEvent<T> = (state: T) => void;

export type ProxyEvent<T, K extends keyof T> = {
  type: K;
  handler: (state: T[K]) => void;
};

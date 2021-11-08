export interface Model<T> {
  namespace: string;
  handler: (state: T, action: any) => T;
}

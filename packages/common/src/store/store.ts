/**
 * 主要用于状态监听，利用发布订阅的模式来回调监听的函数，方便将外部状态与hook同步，这样class内部就能专注于自身逻辑，外部则监听需要关注的变量
 *
 * 目前设定三种监听模式：
 * 1. 全state监听，传入参数为undefined，返回值为state
 * 2. state 单个字段监听，传入参数为 key, 返回值为state[key]
 * 3. state 某几个字段监听，传入参数为 key[], 返回值为 Pick<state,key[]>
 *
 *
 */

import { StoreEvent, HandlerByType, NullDefault, PickByKey } from './interface';

export class Store<T> {
  private events: StoreEvent<T>[] = [];

  constructor(private state: T) { }

  // 遍历events然后执行回调
  private initEvents = (oldState: Partial<T>, newState: Partial<T>) => {
    const diffKeys = this.diff(oldState, newState);

    this.events.forEach(item => {
      if (typeof item.type === 'string') {
        if (diffKeys.includes(item.type))
          item.handler(newState[item.type as keyof T] as HandlerByType<T>);
      } else if (Array.isArray(item.type)) {
        if (diffKeys.some(ele => (item.type as (keyof T)[]).includes(ele)))
          item.handler(
            Object.fromEntries(
              Object.entries(newState).filter(single =>
                (item.type as (keyof T)[]).includes(single[0] as keyof T)
              )
            ) as HandlerByType<T>
          );
      } else {
        item.handler(newState);
      }
    });
  };

  private diff = (prev: Partial<T>, cur: Partial<T>) => {
    const prevKeys = Object.keys(prev) as (keyof T)[];
    const curKeys = Object.keys(cur) as (keyof T)[];

    const newKeys = curKeys.filter(item => !prevKeys.includes(item));
    const diffKeys = prevKeys.filter(item => {
      if (prev[item] === cur[item]) return false;
      return true;
    });

    return [...diffKeys, ...newKeys];
  };

  public setState = (value: Partial<T>) => {
    const newState = { ...this.state, ...value };
    const oldState = this.state;
    this.state = newState;

    this.initEvents(oldState, newState);
  };

  public getState = <K extends keyof T, U extends undefined | K | K[]>(
    type?: U
  ): NullDefault<U, T, PickByKey<T, U>> => {
    if (!type) return this.state as NullDefault<U, T, PickByKey<T, U>>;
    if (typeof type === 'string')
      return this.state[type as K] as NullDefault<U, T, PickByKey<T, U>>;

    return Object.fromEntries(
      Object.entries(this.state).filter(item =>
        (type as K[]).includes(item[0] as K)
      )
    ) as NullDefault<U, T, PickByKey<T, U>>;
  };

  public listen = <K extends keyof T, U extends undefined | K | K[]>(
    handler: (state: NullDefault<U, T, PickByKey<T, U>>) => void,
    type?: U
  ) => {
    const event = {
      type,
      handler,
    } as StoreEvent<T>;

    if (this.events.some(item => item.handler === event.handler)) return;
    this.events.push(event);
  };

  public unlisten = <K extends keyof T, U extends undefined | K | K[]>(
    handler: (value: NullDefault<U, T, PickByKey<T, U>>) => void,
    type?: U
  ) => {
    if (!this.events.some(item => item.handler === handler)) return;
    this.events = this.events.filter(item => item.handler !== handler);
  };
}
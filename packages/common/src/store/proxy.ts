import { ProxyEvent } from './interface';

export class SubscriptionProxy<T extends Record<string, unknown>> {
  private state: T;
  private events: ProxyEvent<T, keyof T>[] = [];

  constructor(state: T) {
    this.state = new Proxy(state, {
      set: <K extends keyof T>(target: T, propKey: K | symbol, value: T[K]) => {
        Reflect.set(target, propKey, value);

        this.initEvents(propKey, value);

        return true;
      },
    });
  }

  private initEvents = <K extends keyof T>(
    propKey: K | symbol,
    value: T[K]
  ) => {
    this.events
      .filter(item => item.type === propKey)
      .forEach(event => event.handler(value));
  };

  public setState = <K extends keyof T>(propKey: K, value: T[K]) => {
    Reflect.set(this.state, propKey, value);
  };

  public getState = <K extends keyof T>(propKey: K) => this.state[propKey];

  public listen = <K extends keyof T>(
    propKey: K,
    handler: (value: T[K]) => void
  ) => {
    if (this.events.some(item => item.handler === handler)) return;
    this.events.push({ type: propKey, handler } as unknown as ProxyEvent<
      T,
      keyof T
    >);
  };

  public unlisten = <K extends keyof T>(
    propKey: K,
    handler: (value: T[K]) => void
  ) => {
    if (!this.events.some(item => item.handler === handler)) return;
    this.events = this.events.filter(item => item.handler !== handler);
  };
}

import { SubscriptionEvent } from './interface';

export class Subscription<T> {
  private events: SubscriptionEvent<T>[] = [];

  constructor(private state: T) {}

  private initEvents = () => {
    this.events.forEach(item => item(this.state));
  };

  public setState = (value: Partial<T>) => {
    this.state = { ...this.state, ...value };
    this.initEvents();
  };

  public getState = () => this.state;

  public listen = (event: SubscriptionEvent<T>) => {
    if (!this.events.includes(event)) this.events.push(event);
  };

  public unlisten = (event: SubscriptionEvent<T>) => {
    if (!this.events.includes(event)) return;
    this.events = this.events.filter(item => item !== event);
  };
}

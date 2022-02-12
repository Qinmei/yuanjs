import { message } from 'antd';
import { modelStore } from './store';
import { Options, Request, RequestRes, Methods } from '@yuanjs/common';

export class Model<T> {
  constructor(public namespace: string, private initialState: T) {}

  private success<T>(res: RequestRes<T>): [boolean, T, number, RequestRes<T>] {
    return [true, res.data, res.code, res];
  }

  private error<T>(res: RequestRes<T>): [boolean, T, number, RequestRes<T>] {
    return [false, res?.data, res.code, res];
  }

  protected dispatch(payload: Partial<T>) {
    const store = modelStore.getStore();
    if (!store) return;

    store.dispatch<{ type: string; payload: Partial<T> }>({
      type: this.namespace,
      payload,
    });
  }

  protected async init<K>(
    method: Methods,
    url: string,
    data: Options,
    dispatch?: (payload: K) => void
  ) {
    return Request.init<K>(method, url, data).then(async res => {
      if ([200, 2000].includes(res?.code)) {
        dispatch && dispatch(res.data);
        return this.success(res);
      } else {
        res?.msg && message.error(res?.msg);
        return this.error(res);
      }
    });
  }

  reducer = (
    state = this.initialState,
    action: { type: string; payload: Partial<T> }
  ): T => {
    if (action && action.type === this.namespace) {
      return {
        ...state,
        ...action.payload,
      };
    } else {
      return state;
    }
  };
}

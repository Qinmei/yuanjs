import { message } from 'antd';

import {
  Methods,
  Options,
  Request,
  RequestRes,
  ServiceException,
} from '@yuanjs/common';

import { modelStore } from './store';

export class Model<T> {
  private request = new Request();
  constructor(public namespace: string, private initialState: T) {}

  private success<T>(res: RequestRes<T>) {
    return res.data;
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
    return this.request.init<K>(method, url, data).then(async res => {
      if ([200, 2000].includes(res?.code)) {
        dispatch && dispatch(res.data);
        return this.success(res);
      } else {
        res?.msg && message.error(res?.msg);
        throw new ServiceException(res.response, res.msg);
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

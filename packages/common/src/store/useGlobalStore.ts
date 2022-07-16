import { useEffect, useState } from 'react';
import { SubscriptionEvent } from './interface';

import { Subscription } from './subscription';

const store: Record<string, Subscription<any>> = {};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

const getStore = <T extends Record<string, unknown>>(
  namespace: string,
  initialState: T
): Subscription<T> => {
  if (!namespace) {
    return new Subscription(initialState);
  } else if (store[namespace]) {
    return store[namespace];
  } else {
    store[namespace] = new Subscription(initialState);
    return store[namespace];
  }
};

export const useGlobalStore = <T extends Record<string, unknown>>(
  namespace: string,
  initialState: T
) => {
  const [store] = useState(() => {
    return getStore(namespace, initialState);
  });

  const [state, setState] = useState<T>(store.getState());

  useEffect(() => {
    store.listen(setState);

    return () => {
      store.unlisten(setState);
    };
  }, [store, store.setState]);

  return [state, store.setState] as [T, SubscriptionEvent<Partial<T>>];
};

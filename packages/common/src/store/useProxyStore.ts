import { useCallback, useEffect, useState } from 'react';

import { SubscriptionProxy } from './proxy';

export const useProxyStore = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  store: SubscriptionProxy<T>,
  propKey: K
) => {
  const [state, setState] = useState(store.getState(propKey));

  const setData = useCallback(
    (value: T[K]) => {
      store.setState(propKey, value);
    },
    [propKey, store]
  );

  useEffect(() => {
    store.listen(propKey, setState);

    return () => {
      store.unlisten(propKey, setState);
    };
  }, [propKey, store, store.setState]);

  return [state, setData] as [T[K], (value: T[K]) => void];
};

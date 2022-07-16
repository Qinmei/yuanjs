import { useCallback, useEffect, useState } from 'react';

import { NullDefault, PickByKey, PickByKeyPartial } from './interface';
import { Store } from './store';

export const useStore = <T, K extends keyof T, U extends undefined | K | K[]>(
  store: Store<T>,
  field?: U
) => {
  const [state, setState] = useState(store.getState<K, U>(field));

  const setData = useCallback(
    (value: NullDefault<U, Partial<T>, PickByKey<T, U>>) => {
      if (typeof field === 'string') {
        store.setState({
          [field]: value,
        } as unknown as Partial<T>);
      } else {
        store.setState(value as Partial<T>);
      }
    },
    [field, store]
  );

  const setStateCall = useCallback(
    (value: NullDefault<U, T, PickByKey<T, U>>) => {
      setState(value);
    },
    []
  );

  useEffect(() => {
    store.listen(setStateCall, field);

    return () => store.unlisten(setStateCall, field);
  }, [field, setStateCall, store]);

  return [state, setData] as [
    NullDefault<U, T, PickByKey<T, U>>,
    (value: NullDefault<U, Partial<T>, PickByKeyPartial<T, U>>) => void
  ];
};

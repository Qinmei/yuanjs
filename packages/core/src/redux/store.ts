import { Store } from 'redux';

let store: Store;

const getStore = () => store;

const setStore = (data: any) => {
  store = data;
};

export const handStore = () => [getStore(), setStore];

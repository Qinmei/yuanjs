import { Model } from './model';
import { useSelector } from 'react-redux';

export const useModel = <T>(model: Model<T>) =>
  useSelector<Record<string, T>, T>(state => state[model.namespace]);

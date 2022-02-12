import { Module } from './module';

export interface FactoryOptions {
  middleware?: Middleware[];
}

export type Middleware = (module: Module, children: JSX.Element) => JSX.Element;

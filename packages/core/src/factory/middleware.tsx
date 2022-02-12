/**
 * middleware则希望能够更加的纯粹与简洁，另外不做成component传参的形式也是希望能够尽可能的摆脱react的影响，不做成运行时的配置，而是打包的时候就生成完毕，可以静态分析
 */
import React from 'react';
import { Middleware, Module } from '../interface';

export const compose = (middlewares: Middleware[], args: Module) => {
  return middlewares.reduceRight(
    (prev, next) => next(args, prev),
    (<></>) as JSX.Element
  );
};

/**
 * 1. 用遍历算法将所有的模块都遍历出来，然后将其组成二维数组
 * 2. 用加载的中间件去处理二维模块数据，生成reduce结果
 * 3. 将生成的组件层层包裹起来生成最终的组件详情
 */

import { Module } from '../interface';

export class ModuleFactory {
  private rootModule: YuanModule;

  constructor(private appModule: Module) {
    this.rootModule = this.createModuleFromElement(appModule);
  }

  private getModuleImports(module: Module): Module[] {
    let importModules = Reflect.get(module, 'imports') || [];
    if (typeof importModules === 'function') importModules = importModules();
    return importModules;
  }

  // 从原始module创建一个Module实例
  private createModuleFromElement(element: Module): YuanModule {
    // 类似 createFiberFromElement
    const module = new YuanModule(element);

    // 处理 imports（类似 React 处理 children）
    const imports = this.getModuleImports(element);
    if (imports.length) {
      this.reconcileChildren(module, imports);
    }

    return module;
  }

  // 遍历模块树
  private reconcileChildren(parent: YuanModule, children: Module[]) {
    // 类似 reconcileChildren
    let prevSibling: YuanModule | null = null;

    children.forEach(child => {
      const newModule = this.createModuleFromElement(child);
      newModule.parent = parent;

      if (prevSibling === null) {
        // 第一个子节点
        parent.child = newModule;
      } else {
        // 链接兄弟节点
        prevSibling.next = newModule;
      }
      prevSibling = newModule;
    });
  }

  // 遍历模块树，深度优先遍历模块树，回调函数接收当前 YuanModule, 可自由决定如何处理
  public traverseModules(
    callback: (module: YuanModule) => void,
    module: YuanModule = this.rootModule
  ): void {
    callback(module);
    let child = module.child;
    while (child) {
      this.traverseModules(callback, child);
      child = child.next;
    }
  }

  // module组成tree之后，得考虑如何对其进行相关的操作，比如说支持插件遍历，同时需要支持模块的动态添加和卸载
  // module类似react中的fiber,仅作节点的定义，实际跟react的结合则由render来实现，当前将其全下放到插件，感觉还是得内置进来，不然默认都跑不通
}

// module自身不递归，由factory进行递归
export class YuanModule {
  private uuid: string;

  // 指向原始模块，只做单纯的指向记录
  public type: Module;

  // 下一个兄弟模块
  public next?: YuanModule;

  // 父模块
  public parent?: YuanModule;

  // 子模块，imports直接全部都使用链表进行连接，可以考虑双向链表？
  public child?: YuanModule;

  constructor(module: Module) {
    this.type = module;
    this.uuid = this.generateUUID();
  }

  // 生成唯一标识符的方法
  private generateUUID(): string {
    // 简单的 UUID 生成逻辑，可根据需要替换为更复杂的实现
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private getInfo = <K extends keyof Module>(type: K): Module[K] => {
    return Reflect.get(this.type, type);
  };

  public getOptions = (): Module['options'] => {
    return this.getInfo('options');
  };

  public getData = (): Module['data'] => {
    return this.getInfo('data');
  };

  public getRender = (): Module['render'] => {
    return this.getInfo('render');
  };

  // 获取子模块信息，可以提供只获取一层、以及全部获取的方法
  // 只获取一层主要是为了将层级进行展示，获取多层主要是有一些路由需要提前激活
  // 这里有问题，子模块的信息应该有一个专门的commit函数来操作，此处应该只做module的定义
  public getImports = () => {
    const child = this.child;
  };
}

import 'reflect-metadata';
import { ModuleMetadata } from '../interfaces/decorators.interface';

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: any) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}

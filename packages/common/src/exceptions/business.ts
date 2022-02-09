import { Exception } from './base';

export class BusinessException extends Exception {
  constructor(
    public readonly module: string,
    public readonly name: string,
    public readonly message: string = 'business exception happens'
  ) {
    super('business', name, message);
  }
}

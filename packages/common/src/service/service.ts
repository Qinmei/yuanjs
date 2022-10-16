import { ServiceException } from '../exceptions';
import { Options } from './interface';
import { Request } from './request';
import { Methods } from './url';

export class Service {
  private request = new Request();

  public init = async <K>(methods: Methods, url: string, data: Options) => {
    return this.request.init<K>(methods, url, data).then(async res => {
      if ([10000].includes(res?.code)) {
        return res.data;
      } else {
        throw new ServiceException(res.response, res.msg as string);
      }
    });
  };
}

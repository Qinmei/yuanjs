import { stringify } from 'qs';

import { Methods } from './url';
import { HttpException } from '../exceptions';
import { Options, RequestRes } from './interface';

export class Request {
  public async init<T>(
    methods: Methods,
    url: string,
    options: Options
  ): Promise<RequestRes<T>> {
    const { param, query, data, formData, header, ...props } = options;

    let defaultHeader: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };

    let link: string = url;
    if (param) {
      link = link.replace(
        /\/:(\w+)/gm,
        index => `/${param[`${index.replace(/\/:/g, '')}`]}`
      );
    }

    if (query) {
      Object.keys(query).forEach(item => {
        if (!query[item] && query[item] !== 0) delete query[item];
      });

      link += `?${stringify(query)}`;
    }

    if (formData) {
      defaultHeader = {};
    }

    return fetch(link, {
      body: formData ? formData : data ? JSON.stringify(data) : null,
      headers: {
        ...defaultHeader,
        ...header,
      },
      method: methods,
      ...props,
    })
      .then(this.statusCheck)
      .then(this.resFormat);
  }

  private async resFormat(res: Response) {
    const newRes = await res.json();
    return {
      ...newRes,
      response: res,
    };
  }

  private statusCheck(res: Response): Response {
    if (![200, 201, 306].includes(res.status)) {
      throw new HttpException(res.status, res.url);
    }
    return res;
  }
}

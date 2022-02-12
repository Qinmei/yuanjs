import { stringify } from 'qs';

import { Methods } from './url';
import { HttpException } from '../exceptions';
import { Options, RequestRes } from './interface';

export class Request {
  static async init<T>(
    methods: Methods,
    url: string,
    options: Options
  ): Promise<RequestRes<T>> {
    const { params, query, data, formData, ...props } = options;

    let defaultHeader: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };

    let link: string = url;
    if (params) {
      link = link.replace(
        /\/:(\w+)/gm,
        index => `/${params[`${index.replace(/\/:/g, '')}`]}`
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
        Authorization: sessionStorage.getItem('token') || '',
      },
      method: methods,
      ...props,
    })
      .then(this.statusCheck)
      .then(this.resFormat);
  }

  static async resFormat(res: Response) {
    const newRes = await res.json();
    return {
      ...newRes,
      response: res,
    };
  }

  static statusCheck(res: Response): Response {
    if (![200, 201, 306].includes(res.status)) {
      throw new HttpException(res.status, res.url);
    }
    return res;
  }
}

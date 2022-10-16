export type Options = {
  [key: string]: unknown;
  param?: any;
  query?: any;
  data?: any;
  formData?: FormData;
  header?: HeadersInit;
};

export type RequestRes<T> = {
  code: number;
  msg: string | null;
  data: T;
  response: Response;
};

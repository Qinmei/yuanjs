export type Options = {
  [key: string]: unknown;
  param?: {
    [key: string]: string | number;
  };
  query?: {
    [key: string]: unknown;
  };
  data?: unknown;
  formData?: FormData;
};

export type RequestRes<T> = {
  code: number;
  msg: string | null;
  data: T;
  response: Response;
};

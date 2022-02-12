export type Options = {
  [key: string]: unknown;
  param?: unknown;
  query?: unknown;
  data?: unknown;
  formData?: FormData;
};

export type RequestRes<T> = {
  code: number;
  msg: string | null;
  data: T;
  response: Response;
};

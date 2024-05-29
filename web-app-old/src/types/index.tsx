export type ErrorResponse = {
  error: true;
  message: string;
  details: Record<string, any> | undefined;
  statusCode: number;
  timestamp: string;
  path: string;
};

export type FetcherResponse<T> = (T & { error: undefined }) | ErrorResponse;

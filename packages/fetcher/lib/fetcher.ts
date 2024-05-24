export type FetchHeaders =
  | (Headers & {
      Authorization?: string;
      'Content-Type'?: string;
    })
  | Record<any, any>;

export type FetchConfig = {
  baseURL: string;
  headers: FetchHeaders;
};

export type RequestConfig = RequestInit & {
  _retry?: boolean;
  headers: FetchHeaders;
  fullUrl: string | URL;
};

export type FetchResponse<DATA> = Response & {
  data: DATA;
};

export type FetchMiddleware<
  T extends 'request' | 'response',
  D extends {} = object,
> = {
  request: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  response: (
    config: RequestConfig,
    response: FetchResponse<D>,
  ) => FetchResponse<D> | Promise<FetchResponse<D>>;
}[T];

export class Fetcher {
  config: FetchConfig;
  fetch: typeof fetch;
  middlewares: {
    request: FetchMiddleware<'request'>[];
    response: FetchMiddleware<'response'>[];
  };
  constructor(config: Record<any, any> = {}) {
    this.config = {
      baseURL: '',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      ...config,
    };
    this.fetch = fetch;
    this.middlewares = {
      request: [],
      response: [],
    };
  }

  use<T extends 'request' | 'response'>(
    type: T,
    middleware: FetchMiddleware<T>,
  ) {
    if (type === 'request') {
      this.middlewares.request.push(middleware as FetchMiddleware<'request'>);
    } else if (type === 'response') {
      this.middlewares.response.push(middleware as FetchMiddleware<'response'>);
    } else {
      throw new Error(`Invalid middleware type: ${type}`);
    }
  }

  async handle<D extends {}>(
    url: string | URL,
    config: RequestInit,
  ): Promise<FetchResponse<D>> {
    const { baseURL, headers } = this.config;
    const fullUrl = new URL(url, baseURL).toString();
    let body: any = undefined;
    if (config.body) {
      if (typeof config.body === 'string') {
        body = config.body;
      } else {
        body = JSON.stringify(config.body);
      }
    }
    let requestOptions: RequestConfig = {
      ...config,
      method: config.method,
      headers: {
        ...headers,
        ...config.headers,
      },
      body: body,
      fullUrl: fullUrl,
    };

    for (const middleware of this.middlewares.request) {
      requestOptions = await middleware(requestOptions);
    }

    const response = await this.fetch(fullUrl, requestOptions);

    const data: D = await response.json();

    for (const middleware of this.middlewares.response) {
      await middleware(requestOptions, { ...response, data });
    }

    return { ...response, data };
  }

  request<D extends {} = any>(config: RequestConfig) {
    const { fullUrl } = config;
    return this.handle<D>(fullUrl, config);
  }

  get<D extends {} = any>(url: string | URL, config: RequestInit = {}) {
    return this.handle<D>(url, { ...config, method: 'GET' });
  }

  post<D extends {} = any>(
    url: string | URL,
    data: any,
    config: RequestInit = {},
  ) {
    return this.handle<D>(url, { ...config, method: 'POST', body: data });
  }

  put<D extends {} = any>(
    url: string | URL,
    data: any,
    config: RequestInit = {},
  ) {
    return this.handle<D>(url, { ...config, method: 'PUT', body: data });
  }

  delete<D extends {} = any>(url: string | URL, config: RequestInit = {}) {
    return this.handle<D>(url, { ...config, method: 'DELETE' });
  }
}

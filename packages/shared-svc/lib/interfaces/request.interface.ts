import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: any;
};

export interface Headers extends Record<string, any> {
  authorization?: string;
};

export interface ServiceRequest<Data = Record<string, any>> {
  headers?: Headers;
  data: Data;
};

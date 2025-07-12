const { AsyncLocalStorage } = require('async_hooks');


export interface IRequestContext {
  correlationId: string;
  timestamp: number;
  who: any;
}

export const requestContext = new AsyncLocalStorage();

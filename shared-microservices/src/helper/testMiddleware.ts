import express, { Express, RequestHandler } from 'express';
import { IncomingHttpHeaders } from 'http';
import { agent, Response } from 'supertest';

type Arguments = {
  readonly headers?: IncomingHttpHeaders;
  readonly middleware: RequestHandler;
  readonly routeHandler?: RequestHandler;
};

export const testMiddleware = async ({ headers, middleware, routeHandler }: Arguments): Promise<Response> => {
  const app: Express = express();
  app.use(middleware);
  app.get('/', routeHandler || ((req, res, next) => res.send('ok')));

  const response = await agent(app)
    .get('/')
    .set(headers || {})
    .send();

  return response;
};

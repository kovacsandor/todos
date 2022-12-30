import { GetLoggedInUserPayload } from 'src/response';
import { Endpoint, ServerResponse } from 'src/type';

export type GetLoggedInUser = Endpoint<
  'get',
  Record<string, never>,
  '/api/user-service/logged-in-user',
  Record<string, never>,
  Response
>;

type Response = ServerResponse<GetLoggedInUserPayload>;

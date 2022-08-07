export type Endpoint<
  Method extends 'get' | 'post' | 'put' | 'delete' | 'patch',
  Params extends Record<string, string>,
  Path extends string,
  RequestBody extends Record<string, any>,
  Response extends Record<string, any>,
> = {
  readonly method: Method;
  readonly params: Params;
  readonly path: Path;
  readonly requestBody: RequestBody;
  readonly response: Response;
};

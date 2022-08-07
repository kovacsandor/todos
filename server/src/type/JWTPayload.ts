import { User } from 'todos-shared';

export interface JWTPayload {
  readonly iat: number;
  readonly sub: User['id'];
}

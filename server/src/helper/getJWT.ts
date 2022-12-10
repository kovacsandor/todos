import { encode } from 'jwt-simple';
import { JWTPayload } from 'src/type';
import { User } from 'todos-shared';

export const getJWT = (userId: User['id']): string => {
  const payload: JWTPayload = {
    iat: new Date().getTime(),
    sub: userId,
  };

  const token = encode(payload, process.env.JWT_SECRET);

  return token;
};

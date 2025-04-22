import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { IJwtPayload } from './auth.interface';

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: number | StringValue
): string => {
  const options: SignOptions = {
    expiresIn,
  };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

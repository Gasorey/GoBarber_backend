import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authCofing from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing ', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authCofing.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

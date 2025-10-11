import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { ApiError } from '../utils/api-error';

declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

  const refreshToken = req.cookies?.refreshToken || req.header('Authorization')?.replace('Bearer ', '');


  if (!accessToken || !refreshToken) {
    throw new ApiError(401, 'unauthorized request');
  }

  const decodeAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
  const decodeRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload

  if (
    decodeAccessToken._id !== decodeRefreshToken._id
  ) {
    throw new ApiError(401, 'Invalid token');
  }

  const user = await User.findById(decodeAccessToken._id).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(401, 'Invalid access token');
  }
  req.user = user;
  next();
};

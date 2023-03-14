import { NextFunction, Request, Response } from "express";

import { Token } from "../dataBase";
import { ApiError } from "../errors";

class AuthMiddleware {
  public async checkedAccessToken(
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        throw new ApiError("Token not valid!", 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();

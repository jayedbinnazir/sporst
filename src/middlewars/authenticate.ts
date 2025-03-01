import { NextFunction, Request, Response } from "express";
import { TokenService } from "../modules/auth/services/TokenService";
import createHttpError from "http-errors";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "./interfaces";
import { User } from "@prisma/client";

export class AuthenticationService {
  private tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
  }

  // Middleware to check user authentication and set selected user fields on request
  async checkUserAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken; // Accessing 'accessToken' cookie
    if (!token) {
      const err = createHttpError(403, "Unauthorized: No token provided");
      return next(err); // Return error using next() to move to the error handler
    }

    try {
      // Verifying the token and extracting the payload
      const payload: JwtPayload = this.tokenService.verifyToken(token);

      // Extracting user ID (sub) from the payload
      const { sub } = payload;


      // Select specific fields to attach to req.user
      req.user = {
        id:Number(sub)
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      const err = createHttpError(403, "Forbidden: Invalid or expired token");
      return next(err); // Handle invalid token error
    }
  }
}

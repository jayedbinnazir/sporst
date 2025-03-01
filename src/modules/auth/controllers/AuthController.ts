// src/modules/auth/controllers/AuthController.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import createHttpError from "http-errors";
import container from "../../../utils/container";
import { TokenService } from "../services/TokenService";
import { validationResult } from "express-validator";
import { RegisterDTO } from "../interfaces/RegisterDTO";
import { LoginDTO } from "../interfaces/LoginDTO";
import { JwtPayload } from "jsonwebtoken";
import { CredentialService } from "../services/CredentialService";

export class AuthController {
  private authService: AuthService;
  private tokenService: TokenService;
  private credentialService: CredentialService;

  constructor(
    authService: AuthService,
    tokenService: TokenService,
    credentialService: CredentialService
  ) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.credentialService = credentialService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const errorResults = validationResult(req);

    if (!errorResults.isEmpty()) {
      res.status(400).json({ errors: errorResults.array() });
      return;
    }

    const { name, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      const err = createHttpError(400, "Passwords do not match!");
      next(err);
      return;
    }

    const userData = { name, phone, email, password };

    try {
      const user = await this.authService.createUser(userData);

      const payLoad: JwtPayload = {
        sub: String(user.id),
        role: user.role,
      };

      const accessToken = this.tokenService.generateAccessToken(payLoad);

      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60, //1h
      });

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const errorResults = validationResult(req);

    if (!errorResults.isEmpty()) {
      res.status(400).json({ errors: errorResults.array() });
      return;
    }

    const user: LoginDTO = req.body;

    try {
      const userData = await this.authService.getUserByEmail(user.email);

      if (!userData) {
        const err = createHttpError(404, "invalid email or password");
        throw err;
      }

      const passwordMatched = await this.credentialService.comparePassword(
        user.password,
        userData.password
      );

      if (!passwordMatched) {
        const err = createHttpError(
          400,
          "Email or password does not matched !"
        );
        next(err);
        return;
      }

      const payLoad: JwtPayload = {
        sub: String(userData.id),
        role: userData.role,
      };

      const accessToken = await this.tokenService.generateAccessToken(payLoad);

      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60, //1h
      });

      console.log("user has been logged in", {
        id: userData.id,
        role: userData.role,
      });

      res.status(200).json({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });
    } catch (err) {
      next(err);
      return;
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
      
  }

  // Add other methods like login, verifyOtp, etc.
}

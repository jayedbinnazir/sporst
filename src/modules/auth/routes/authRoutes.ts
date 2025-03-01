// src/modules/auth/routes/authRoutes.ts
import express, { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { TokenService } from "../services/TokenService";
import registerValidators from "../../../validators/register-validators";
import loginValidators from "../../../validators/login-validators";
import { CredentialService } from "../services/CredentialService";
import { AuthenticationService } from "../../../middlewars/authenticate";
import { AuthRequest } from "../../../middlewars/interfaces";

const router = express.Router();

//dependencies
const tokenService = new TokenService();
const authService = new AuthService();
const credentialService = new CredentialService();
const authenticationService = new AuthenticationService(tokenService);
const authController = new AuthController(
  authService,
  tokenService,
  credentialService
);

router.post(
  "/register",
  registerValidators,
  (req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next)
);
router.post(
  "/login",
  loginValidators,
  (req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next)
);
router.post(
  "/update",
  (req: Request, res: Response, next: NextFunction) => {
    // Cast `req` to `AuthRequest` to ensure `user` is available
    const authReq = req as unknown as AuthRequest;

    // Call the checkUserAuth method with the properly typed request
    return authenticationService.checkUserAuth(authReq, res, next);
  },
  (req: Request, res: Response, next: NextFunction) =>
    authController.update(req, res, next)
);
// Add other routes like /login, /verify-otp, etc.

export default router;

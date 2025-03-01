import createHttpError from "http-errors";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Config } from "../../../config";

export class TokenService {
   // Generate an access token
   generateAccessToken(payload: JwtPayload): string {
      try {
         // Ensure the JWT secret is defined
         if (!Config.JWT_SECRET) {
            throw createHttpError(500, "JWT secret is not configured");
         }

         // Generate the access token
         const accessToken = sign(payload, Config.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
            issuer: "auth_service", // Issuer of the token
            algorithm: "HS256", // Use HMAC SHA-256 algorithm
         });

         return accessToken;
      } catch (err) {
         console.error("Error generating access token:", err);
         throw createHttpError(500, "Failed to generate access token");
      }
   }


   verifyToken(token: string): JwtPayload {
      try {
         // Ensure the JWT secret is defined
         if (!Config.JWT_SECRET) {
            throw createHttpError(500, "JWT secret is not configured");
         }

         // Verify the token
         const decoded = verify(token, Config.JWT_SECRET, {
            algorithms: ["HS256"], // The algorithm that you used to sign the token
            issuer: "auth_service", // The expected issuer of the token
         }) as JwtPayload; // Casting the decoded token to the JwtPayload type

         return decoded;   
      } catch (err) {
         console.error("Error verifying token:", err);
         
         // Handle token verification errors
         if (err instanceof Error) {
            // Check if it's a JWT specific error like expired or invalid token
            if (err.message.includes("jwt expired")) {
               throw createHttpError(401, "Token has expired");
            }
            if (err.message.includes("invalid token")) {
               throw createHttpError(401, "Invalid token");
            }
         }

         // General server error for other cases
         throw createHttpError(500, "Failed to verify token");
      }
   }
}
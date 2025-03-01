// src/app.ts
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/routes/authRoutes"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('auth-service');
});

app.use('/auth', authRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        location: '',
        path: req.path,
      },
    ],
  });
});

export default app;
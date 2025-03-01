// src/server.ts
import { PrismaClient } from '@prisma/client';
import app from './app';
import { Config } from './config';

const prisma = new PrismaClient();

const startServer = async () => {
  const PORT = Config.PORT;
  await prisma.$connect();
  try {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Listening to PORT, ${PORT}`);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

void startServer();
import { UserRole } from "@prisma/client";

// src/modules/auth/interfaces/RegisterDTO.ts
export interface RegisterDTO {
    name: string;
    phone: string;
    email: string;
    password: string;
    role?: UserRole // Optional, defaults to 'COACH'
  }
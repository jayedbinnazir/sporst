// src/modules/payments/interfaces/Payment.ts
export interface Payment {
    id: number;
    amount: number;
    currency: string;
    status: string;
    userId: number;
    createdAt: Date;
  }
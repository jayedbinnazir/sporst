// src/modules/plans/interfaces/Plan.ts
export interface Plan {
    id: number;
    name: string;
    priceMonthly: number;
    priceYearly: number;
    features: string;
    userId: number;
  }
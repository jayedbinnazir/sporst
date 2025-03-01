// src/modules/plans/interfaces/CreatePlanDTO.ts
export interface CreatePlanDTO {
    name: string;
    priceMonthly: number;
    priceYearly: number;
    features: string;
    userId: number;
  }
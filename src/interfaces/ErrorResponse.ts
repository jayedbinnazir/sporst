// src/interfaces/ErrorResponse.ts
export interface ErrorResponse {
    errors: {
      type: string;
      msg: string;
      location?: string;
      path?: string;
    }[];
  }
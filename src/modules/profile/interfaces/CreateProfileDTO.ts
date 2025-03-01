// src/modules/profile/interfaces/CreateProfileDTO.ts
export interface CreateProfileDTO {
    clubName: string;
    teamName: string;
    city: string;
    country: string;
    logoUrl?: string;
    coachName: string;
    userId: number;
  }
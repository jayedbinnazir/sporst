// src/modules/profile/interfaces/Profile.ts
export interface Profile {
    id: number;
    clubName: string;
    teamName: string;
    city: string;
    country: string;
    logoUrl?: string;
    coachName: string;
    userId: number;
  }
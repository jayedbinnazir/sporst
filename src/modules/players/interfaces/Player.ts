// src/modules/players/interfaces/Player.ts
export interface Player {
    id: number;
    name: string;
    birthYear: number;
    position: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';
    preferredFoot: 'LEFT' | 'RIGHT' | 'BOTH';
    profileId: number;
  }
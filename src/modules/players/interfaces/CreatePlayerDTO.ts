// src/modules/players/interfaces/CreatePlayerDTO.ts
export interface CreatePlayerDTO {
    name: string;
    birthYear: number;
    position: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';
    preferredFoot: 'LEFT' | 'RIGHT' | 'BOTH';
    profileId: number;
  }
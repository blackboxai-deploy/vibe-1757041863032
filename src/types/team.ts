export interface Team {
  id: string;
  name: string;
  tag: string; // Short team identifier (e.g., "TSM", "SKT")
  logo?: string;
  captainId: string;
  members: TeamMember[];
  maxMembers: number; // 1 for solo, 2 for duo, 4 for squad
  stats: TeamStats;
  tournaments: string[]; // Tournament IDs
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface TeamMember {
  playerId: string;
  role: 'CAPTAIN' | 'MEMBER' | 'SUBSTITUTE';
  joinedAt: Date;
  isActive: boolean;
}

export interface TeamStats {
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  winRate: number;
  totalKills: number;
  totalDeaths: number;
  averageKills: number;
  averagePlacement: number;
  tournamentsWon: number;
  tournamentsParticipated: number;
  totalPrizeWon: number;
  rating: number;
  rank: number;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  playerId: string;
  invitedBy: string; // Captain's player ID
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
  createdAt: Date;
  expiresAt: Date;
}

export interface TeamApplication {
  id: string;
  teamId: string;
  playerId: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string; // Captain's player ID
}
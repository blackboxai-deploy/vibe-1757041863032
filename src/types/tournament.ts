export interface Tournament {
  id: string;
  name: string;
  description: string;
  gameMode: 'BR' | 'CS' | 'RANKED';
  format: 'SOLO' | 'DUO' | 'SQUAD';
  maxParticipants: number;
  prizePool: number;
  entryFee: number;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  status: 'UPCOMING' | 'REGISTRATION' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  rules: string;
  organizerId: string;
  brackets?: TournamentBracket;
  registeredTeams: string[]; // Team IDs
  registeredPlayers: string[]; // Player IDs (for solo tournaments)
  currentRound: number;
  totalRounds: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TournamentBracket {
  type: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS';
  rounds: BracketRound[];
  participants: BracketParticipant[];
}

export interface BracketRound {
  roundNumber: number;
  matches: string[]; // Match IDs
  isCompleted: boolean;
}

export interface BracketParticipant {
  id: string;
  name: string;
  type: 'TEAM' | 'PLAYER';
  seed: number;
  isEliminated: boolean;
}

export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  participantId: string; // Team or Player ID
  participantType: 'TEAM' | 'PLAYER';
  registeredAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  paymentStatus?: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface TournamentStats {
  totalParticipants: number;
  totalMatches: number;
  completedMatches: number;
  averageMatchDuration: number;
  topPerformers: {
    participantId: string;
    participantName: string;
    kills: number;
    wins: number;
    points: number;
  }[];
}
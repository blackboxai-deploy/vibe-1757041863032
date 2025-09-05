export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  participants: MatchParticipant[];
  roomCode?: string;
  roomPassword?: string;
  map: FreeFireMap;
  gameMode: 'BR' | 'CS';
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'DISPUTED' | 'CANCELLED';
  results?: MatchResult[];
  scheduledTime: Date;
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in minutes
  streamUrl?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchParticipant {
  id: string; // Team or Player ID
  name: string;
  type: 'TEAM' | 'PLAYER';
  members?: string[]; // Player IDs for team matches
  seed?: number;
  isReady: boolean;
}

export interface MatchResult {
  participantId: string;
  participantName: string;
  placement: number; // Final placement (1st, 2nd, 3rd, etc.)
  kills: number;
  deaths: number;
  damage: number;
  survivalTime: number; // in seconds
  points: number; // Tournament points earned
  screenshot?: string; // Result screenshot URL
  isVerified: boolean;
  verifiedBy?: string; // Admin ID who verified
  verifiedAt?: Date;
}

export interface MatchDispute {
  id: string;
  matchId: string;
  reportedBy: string; // Player/Team ID
  disputeType: 'INCORRECT_RESULT' | 'CHEATING' | 'TECHNICAL_ISSUE' | 'OTHER';
  description: string;
  evidence: string[]; // URLs to screenshots/videos
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';
  resolution?: string;
  resolvedBy?: string; // Admin ID
  createdAt: Date;
  resolvedAt?: Date;
}

export interface LiveMatchUpdate {
  matchId: string;
  timestamp: Date;
  type: 'KILL' | 'DEATH' | 'ELIMINATION' | 'ZONE_DAMAGE' | 'MATCH_END';
  data: {
    killer?: string;
    victim?: string;
    weapon?: string;
    zone?: number;
    playersAlive?: number;
    teamsAlive?: number;
  };
}

export type FreeFireMap = 'BERMUDA' | 'PURGATORY' | 'KALAHARI' | 'ALPINE' | 'NEXTERA';

export interface RoomSettings {
  map: FreeFireMap;
  gameMode: 'BR' | 'CS';
  teamSize: 1 | 2 | 4;
  maxPlayers: number;
  friendly: boolean;
  autoHeadshot: boolean;
  loadout: boolean;
  highDamage: boolean;
  unlimitedAmmo: boolean;
  fastRevive: boolean;
}
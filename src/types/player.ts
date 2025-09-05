export interface Player {
  id: string;
  username: string;
  email: string;
  freeFireId: string; // Free Fire game ID
  freeFireIGN: string; // In-Game Name
  rank: FreeFireRank;
  level: number;
  avatar?: string;
  stats: PlayerStats;
  teamId?: string;
  tournaments: string[]; // Tournament IDs
  achievements: Achievement[];
  preferences: PlayerPreferences;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
}

export interface PlayerStats {
  matchesPlayed: number;
  matchesWon: number;
  winRate: number;
  totalKills: number;
  totalDeaths: number;
  kd: number; // Kill/Death ratio
  averageKills: number;
  bestKillGame: number;
  totalDamage: number;
  averageDamage: number;
  headshots: number;
  headshotPercentage: number;
  survivalTime: number; // Total survival time in minutes
  averageSurvivalTime: number;
  top1Finishes: number;
  top3Finishes: number;
  top10Finishes: number;
  tournamentsWon: number;
  tournamentsParticipated: number;
  totalPrizeWon: number;
  rating: number;
  rank: number;
}

export interface FreeFireRank {
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'HEROIC' | 'GRANDMASTER';
  division: 'I' | 'II' | 'III' | 'IV' | 'V';
  points: number;
  season: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'KILL' | 'WIN' | 'TOURNAMENT' | 'STREAK' | 'SPECIAL';
  unlockedAt: Date;
  progress?: {
    current: number;
    target: number;
  };
}

export interface PlayerPreferences {
  preferredGameMode: 'BR' | 'CS' | 'RANKED';
  preferredRole: 'ASSAULT' | 'SUPPORT' | 'SNIPER' | 'RUSHER';
  notifications: {
    tournamentUpdates: boolean;
    teamInvitations: boolean;
    matchReminders: boolean;
    achievements: boolean;
  };
  privacy: {
    showStats: boolean;
    showTeam: boolean;
    showAchievements: boolean;
  };
}
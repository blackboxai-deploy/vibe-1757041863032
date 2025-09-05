export const GAME_MODES = {
  BR: 'Battle Royale',
  CS: 'Clash Squad',
  RANKED: 'Ranked'
} as const;

export const TOURNAMENT_FORMATS = {
  SOLO: 'Solo',
  DUO: 'Duo',
  SQUAD: 'Squad'
} as const;

export const TOURNAMENT_STATUS = {
  UPCOMING: 'Upcoming',
  REGISTRATION: 'Registration Open',
  LIVE: 'Live',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
} as const;

export const MATCH_STATUS = {
  SCHEDULED: 'Scheduled',
  LIVE: 'Live',
  COMPLETED: 'Completed',
  DISPUTED: 'Disputed',
  CANCELLED: 'Cancelled'
} as const;

export const FREE_FIRE_MAPS = {
  BERMUDA: 'Bermuda',
  PURGATORY: 'Purgatory',
  KALAHARI: 'Kalahari',
  ALPINE: 'Alpine',
  NEXTERA: 'Nextera'
} as const;

export const FREE_FIRE_RANKS = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  DIAMOND: 'Diamond',
  HEROIC: 'Heroic',
  GRANDMASTER: 'Grandmaster'
} as const;

export const RANK_DIVISIONS = ['I', 'II', 'III', 'IV', 'V'] as const;

export const BRACKET_TYPES = {
  SINGLE_ELIMINATION: 'Single Elimination',
  DOUBLE_ELIMINATION: 'Double Elimination',
  ROUND_ROBIN: 'Round Robin',
  SWISS: 'Swiss System'
} as const;

export const USER_ROLES = {
  PLAYER: 'Player',
  ORGANIZER: 'Organizer',
  ADMIN: 'Admin',
  MODERATOR: 'Moderator'
} as const;

export const ACHIEVEMENT_TYPES = {
  KILL: 'Kill Achievement',
  WIN: 'Victory Achievement',
  TOURNAMENT: 'Tournament Achievement',
  STREAK: 'Streak Achievement',
  SPECIAL: 'Special Achievement'
} as const;

export const MAX_TEAM_MEMBERS = {
  SOLO: 1,
  DUO: 2,
  SQUAD: 4
} as const;

export const POINTS_SYSTEM = {
  BR: {
    PLACEMENT: {
      1: 20,
      2: 15,
      3: 12,
      4: 10,
      5: 8,
      6: 6,
      7: 5,
      8: 4,
      9: 3,
      10: 2,
      11: 1,
      12: 1
    },
    KILL: 2
  },
  CS: {
    WIN: 10,
    KILL: 1
  }
} as const;

export const DEFAULT_TOURNAMENT_RULES = `
1. All participants must have a valid Free Fire ID
2. Teams must check-in 15 minutes before match time
3. Use of hacks, cheats, or exploits is strictly prohibited
4. Respect all players and staff members
5. Follow the designated room settings
6. Submit match results within 10 minutes of completion
7. Disputes must be reported within 30 minutes of match completion
`;

export const ROOM_SETTINGS_PRESETS = {
  TOURNAMENT_BR: {
    map: 'BERMUDA',
    gameMode: 'BR',
    teamSize: 4,
    maxPlayers: 12,
    friendly: false,
    autoHeadshot: false,
    loadout: false,
    highDamage: false,
    unlimitedAmmo: false,
    fastRevive: false
  },
  TOURNAMENT_CS: {
    map: 'BERMUDA',
    gameMode: 'CS',
    teamSize: 4,
    maxPlayers: 8,
    friendly: false,
    autoHeadshot: false,
    loadout: false,
    highDamage: false,
    unlimitedAmmo: false,
    fastRevive: false
  }
} as const;
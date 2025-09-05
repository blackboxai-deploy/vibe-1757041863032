import { Tournament, TournamentBracket, BracketRound, BracketParticipant } from '@/types/tournament';

export interface BracketGenerator {
  generateBracket(participants: BracketParticipant[], type: string): TournamentBracket;
}

/**
 * Generate tournament bracket based on bracket type and participants
 */
export function generateTournamentBracket(
  participants: BracketParticipant[], 
  bracketType: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS'
): TournamentBracket {
  switch (bracketType) {
    case 'SINGLE_ELIMINATION':
      return generateSingleEliminationBracket(participants);
    case 'DOUBLE_ELIMINATION':
      return generateDoubleEliminationBracket(participants);
    case 'ROUND_ROBIN':
      return generateRoundRobinBracket(participants);
    case 'SWISS':
      return generateSwissBracket(participants);
    default:
      throw new Error(`Unsupported bracket type: ${bracketType}`);
  }
}

/**
 * Single Elimination Bracket Generation
 */
function generateSingleEliminationBracket(participants: BracketParticipant[]): TournamentBracket {
  const participantCount = participants.length;
  
  // Find the next power of 2 for bracket size
  const bracketSize = Math.pow(2, Math.ceil(Math.log2(participantCount)));
  const totalRounds = Math.log2(bracketSize);
  
  // Shuffle participants for random seeding if not already seeded
  const seededParticipants = participants.map((p, index) => ({
    ...p,
    seed: p.seed || index + 1
  }));
  
  // Sort by seed
  seededParticipants.sort((a, b) => a.seed - b.seed);
  
  const rounds: BracketRound[] = [];
  
  // Generate first round matches
  const firstRoundMatches: string[] = [];
  for (let i = 0; i < bracketSize / 2; i++) {
    const matchId = `match_${1}_${i + 1}`;
    firstRoundMatches.push(matchId);
  }
  
  rounds.push({
    roundNumber: 1,
    matches: firstRoundMatches,
    isCompleted: false
  });
  
  // Generate subsequent rounds
  for (let round = 2; round <= totalRounds; round++) {
    const roundMatches: string[] = [];
    const matchesInRound = Math.pow(2, totalRounds - round);
    
    for (let i = 0; i < matchesInRound; i++) {
      const matchId = `match_${round}_${i + 1}`;
      roundMatches.push(matchId);
    }
    
    rounds.push({
      roundNumber: round,
      matches: roundMatches,
      isCompleted: false
    });
  }
  
  return {
    type: 'SINGLE_ELIMINATION',
    rounds,
    participants: seededParticipants
  };
}

/**
 * Double Elimination Bracket Generation
 */
function generateDoubleEliminationBracket(participants: BracketParticipant[]): TournamentBracket {
  // For now, implement basic double elimination
  // This is a simplified version - full implementation would be more complex
  const singleBracket = generateSingleEliminationBracket(participants);
  
  return {
    type: 'DOUBLE_ELIMINATION',
    rounds: singleBracket.rounds,
    participants: singleBracket.participants
  };
}

/**
 * Round Robin Bracket Generation
 */
function generateRoundRobinBracket(participants: BracketParticipant[]): TournamentBracket {
  const participantCount = participants.length;
  const totalRounds = participantCount - 1;
  const matchesPerRound = Math.floor(participantCount / 2);
  
  const rounds: BracketRound[] = [];
  
  for (let round = 1; round <= totalRounds; round++) {
    const roundMatches: string[] = [];
    
    for (let match = 1; match <= matchesPerRound; match++) {
      const matchId = `rr_match_${round}_${match}`;
      roundMatches.push(matchId);
    }
    
    rounds.push({
      roundNumber: round,
      matches: roundMatches,
      isCompleted: false
    });
  }
  
  return {
    type: 'ROUND_ROBIN',
    rounds,
    participants
  };
}

/**
 * Swiss System Bracket Generation
 */
function generateSwissBracket(participants: BracketParticipant[]): TournamentBracket {
  const participantCount = participants.length;
  const totalRounds = Math.ceil(Math.log2(participantCount));
  
  const rounds: BracketRound[] = [];
  
  for (let round = 1; round <= totalRounds; round++) {
    const roundMatches: string[] = [];
    const matchesInRound = Math.floor(participantCount / 2);
    
    for (let match = 1; match <= matchesInRound; match++) {
      const matchId = `swiss_match_${round}_${match}`;
      roundMatches.push(matchId);
    }
    
    rounds.push({
      roundNumber: round,
      matches: roundMatches,
      isCompleted: false
    });
  }
  
  return {
    type: 'SWISS',
    rounds,
    participants
  };
}

/**
 * Calculate tournament points based on placement and kills
 */
export function calculatePoints(
  placement: number, 
  kills: number, 
  gameMode: 'BR' | 'CS'
): number {
  if (gameMode === 'BR') {
    // Battle Royale scoring system
    const placementPoints = getPlacementPoints(placement);
    const killPoints = kills * 2;
    return placementPoints + killPoints;
  } else {
    // Clash Squad scoring system
    const winPoints = placement === 1 ? 10 : 0;
    const killPoints = kills * 1;
    return winPoints + killPoints;
  }
}

/**
 * Get placement points for Battle Royale
 */
function getPlacementPoints(placement: number): number {
  const pointsMap: { [key: number]: number } = {
    1: 20, 2: 15, 3: 12, 4: 10, 5: 8, 6: 6,
    7: 5, 8: 4, 9: 3, 10: 2, 11: 1, 12: 1
  };
  
  return pointsMap[placement] || 0;
}

/**
 * Check if tournament can start
 */
export function canTournamentStart(tournament: Tournament): boolean {
  const now = new Date();
  const hasEnoughParticipants = tournament.registeredTeams.length >= 4 || tournament.registeredPlayers.length >= 4;
  const registrationClosed = now > tournament.registrationDeadline;
  
  return hasEnoughParticipants && registrationClosed && tournament.status === 'REGISTRATION';
}

/**
 * Get next match for a participant
 */
export function getNextMatch(_participantId: string, bracket: TournamentBracket): string | null {
  // Find the current round where the participant should play
  for (const round of bracket.rounds) {
    if (!round.isCompleted) {
      // This is a simplified implementation
      // In a real system, you'd check match participants
      return round.matches[0] || null;
    }
  }
  
  return null;
}

/**
 * Update bracket after match completion
 */
export function updateBracketAfterMatch(
  bracket: TournamentBracket,
  matchId: string,
  winnerId: string
): TournamentBracket {
  // This is a simplified implementation
  // In a real system, you'd update the bracket structure
  // to advance winners to the next round
  
  const updatedBracket = { ...bracket };
  
  // Mark participants as eliminated based on match results
  updatedBracket.participants = bracket.participants.map(participant => {
    if (participant.id !== winnerId && matchId.includes('_1_')) {
      // This is a simplified elimination logic
      return { ...participant, isEliminated: true };
    }
    return participant;
  });
  
  return updatedBracket;
}
import { NextRequest, NextResponse } from 'next/server';
import { Tournament } from '@/types/tournament';

// Mock data - same as in the main tournaments route
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Free Fire Championship 2024',
    description: 'The biggest Free Fire tournament of the year with massive prizes and international competition!',
    gameMode: 'BR',
    format: 'SQUAD',
    maxParticipants: 64,
    prizePool: 50000,
    entryFee: 0,
    startDate: new Date('2024-02-15T10:00:00Z'),
    endDate: new Date('2024-02-15T18:00:00Z'),
    registrationDeadline: new Date('2024-02-12T23:59:59Z'),
    status: 'REGISTRATION',
    rules: `
1. All participants must have a valid Free Fire ID
2. Teams must check-in 15 minutes before match time
3. Use of hacks, cheats, or exploits is strictly prohibited
4. Respect all players and staff members
5. Follow the designated room settings
6. Submit match results within 10 minutes of completion
    `,
    organizerId: 'org_1',
    registeredTeams: ['team_1', 'team_2', 'team_3'],
    registeredPlayers: [],
    currentRound: 0,
    totalRounds: 6,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '2',
    name: 'Clash Squad Masters',
    description: 'Intense 4v4 battles for the ultimate Clash Squad supremacy. Best teams compete for glory!',
    gameMode: 'CS',
    format: 'SQUAD',
    maxParticipants: 32,
    prizePool: 25000,
    entryFee: 10,
    startDate: new Date('2024-02-12T14:00:00Z'),
    endDate: new Date('2024-02-12T20:00:00Z'),
    registrationDeadline: new Date('2024-02-10T23:59:59Z'),
    status: 'REGISTRATION',
    rules: `
1. 4v4 Clash Squad format
2. Best of 3 matches per round
3. Standard room settings apply
4. No substitutions during matches
5. 5-minute break between matches
    `,
    organizerId: 'org_2',
    registeredTeams: ['team_4', 'team_5', 'team_6', 'team_7'],
    registeredPlayers: [],
    currentRound: 0,
    totalRounds: 5,
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z')
  },
  {
    id: '3',
    name: 'Solo Warriors Championship',
    description: 'Prove your individual skills in this intense solo battle royale tournament.',
    gameMode: 'BR',
    format: 'SOLO',
    maxParticipants: 48,
    prizePool: 15000,
    entryFee: 5,
    startDate: new Date('2024-02-10T16:00:00Z'),
    endDate: new Date('2024-02-10T22:00:00Z'),
    registrationDeadline: new Date('2024-02-08T23:59:59Z'),
    status: 'LIVE',
    rules: `
1. Solo Battle Royale format
2. Multiple rounds with points system
3. Top 12 players advance to finals
4. No teaming allowed
5. Standard BR rules apply
    `,
    organizerId: 'org_3',
    registeredTeams: [],
    registeredPlayers: ['player_1', 'player_2', 'player_3', 'player_4'],
    currentRound: 2,
    totalRounds: 4,
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-08T00:00:00Z')
  }
];

// GET /api/tournaments/[id] - Get specific tournament details
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tournament = mockTournaments.find(t => t.id === params.id);
    
    if (!tournament) {
      return NextResponse.json({
        success: false,
        message: 'Tournament not found'
      }, { status: 404 });
    }

    // In a real app, you might also fetch related data like:
    // - Registered teams/players details
    // - Tournament matches
    // - Bracket information
    // - Tournament statistics

    return NextResponse.json({
      success: true,
      data: tournament
    });
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tournament'
    }, { status: 500 });
  }
}

// PUT /api/tournaments/[id] - Update tournament
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const tournamentIndex = mockTournaments.findIndex(t => t.id === params.id);
    
    if (tournamentIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Tournament not found'
      }, { status: 404 });
    }

    // Update tournament
    const updatedTournament = {
      ...mockTournaments[tournamentIndex],
      ...body,
      updatedAt: new Date()
    };

    mockTournaments[tournamentIndex] = updatedTournament;

    return NextResponse.json({
      success: true,
      data: updatedTournament,
      message: 'Tournament updated successfully'
    });
  } catch (error) {
    console.error('Error updating tournament:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update tournament'
    }, { status: 500 });
  }
}

// DELETE /api/tournaments/[id] - Delete tournament
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tournamentIndex = mockTournaments.findIndex(t => t.id === params.id);
    
    if (tournamentIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Tournament not found'
      }, { status: 404 });
    }

    // Remove tournament
    mockTournaments.splice(tournamentIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Tournament deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tournament:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete tournament'
    }, { status: 500 });
  }
}
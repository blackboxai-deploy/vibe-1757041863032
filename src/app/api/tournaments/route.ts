import { NextRequest, NextResponse } from 'next/server';
import { Tournament } from '@/types/tournament';

// Mock tournament data - In a real app, this would come from a database
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

// GET /api/tournaments - Get all tournaments with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const gameMode = searchParams.get('gameMode');
    const format = searchParams.get('format');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredTournaments = mockTournaments;

    // Apply filters
    if (status) {
      filteredTournaments = filteredTournaments.filter(t => t.status === status);
    }
    if (gameMode) {
      filteredTournaments = filteredTournaments.filter(t => t.gameMode === gameMode);
    }
    if (format) {
      filteredTournaments = filteredTournaments.filter(t => t.format === format);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTournaments = filteredTournaments.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        tournaments: paginatedTournaments,
        pagination: {
          page,
          limit,
          total: filteredTournaments.length,
          totalPages: Math.ceil(filteredTournaments.length / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tournaments'
    }, { status: 500 });
  }
}

// POST /api/tournaments - Create a new tournament
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.description || !body.gameMode || !body.format) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Create new tournament
    const newTournament: Tournament = {
      id: `tournament_${Date.now()}`,
      name: body.name,
      description: body.description,
      gameMode: body.gameMode,
      format: body.format,
      maxParticipants: body.maxParticipants || 32,
      prizePool: body.prizePool || 0,
      entryFee: body.entryFee || 0,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      registrationDeadline: new Date(body.registrationDeadline),
      status: 'UPCOMING',
      rules: body.rules || '',
      organizerId: body.organizerId || 'default_org',
      registeredTeams: [],
      registeredPlayers: [],
      currentRound: 0,
      totalRounds: body.totalRounds || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real app, save to database
    mockTournaments.push(newTournament);

    return NextResponse.json({
      success: true,
      data: newTournament,
      message: 'Tournament created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create tournament'
    }, { status: 500 });
  }
}
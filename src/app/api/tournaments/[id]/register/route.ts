import { NextRequest, NextResponse } from 'next/server';

// Mock tournament registration data
interface TournamentRegistration {
  id: string;
  tournamentId: string;
  participantId: string;
  participantType: 'TEAM' | 'PLAYER';
  participantName: string;
  registeredAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  paymentStatus?: 'PENDING' | 'COMPLETED' | 'FAILED';
}

const mockRegistrations: TournamentRegistration[] = [
  {
    id: 'reg_1',
    tournamentId: '1',
    participantId: 'team_1',
    participantType: 'TEAM',
    participantName: 'Fire Legends',
    registeredAt: new Date('2024-01-05T10:00:00Z'),
    status: 'APPROVED',
    paymentStatus: 'COMPLETED'
  },
  {
    id: 'reg_2',
    tournamentId: '1',
    participantId: 'team_2',
    participantType: 'TEAM',
    participantName: 'Storm Warriors',
    registeredAt: new Date('2024-01-06T14:30:00Z'),
    status: 'APPROVED',
    paymentStatus: 'COMPLETED'
  },
  {
    id: 'reg_3',
    tournamentId: '3',
    participantId: 'player_1',
    participantType: 'PLAYER',
    participantName: 'ShadowHunter',
    registeredAt: new Date('2024-01-04T16:15:00Z'),
    status: 'APPROVED',
    paymentStatus: 'COMPLETED'
  }
];

// Mock tournament data for validation
const mockTournaments = [
  { 
    id: '1', 
    maxParticipants: 64, 
    registeredTeams: ['team_1', 'team_2'] as string[], 
    registeredPlayers: [] as string[], 
    format: 'SQUAD' as const, 
    status: 'REGISTRATION' as const, 
    entryFee: 0 
  },
  { 
    id: '2', 
    maxParticipants: 32, 
    registeredTeams: ['team_4', 'team_5'] as string[], 
    registeredPlayers: [] as string[], 
    format: 'SQUAD' as const, 
    status: 'REGISTRATION' as const, 
    entryFee: 10 
  },
  { 
    id: '3', 
    maxParticipants: 48, 
    registeredTeams: [] as string[], 
    registeredPlayers: ['player_1', 'player_2'] as string[], 
    format: 'SOLO' as const, 
    status: 'LIVE' as const, 
    entryFee: 5 
  }
];

// POST /api/tournaments/[id]/register - Register for tournament
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const tournamentId = params.id;
    
    // Find tournament
    const tournament = mockTournaments.find(t => t.id === tournamentId);
    if (!tournament) {
      return NextResponse.json({
        success: false,
        message: 'Tournament not found'
      }, { status: 404 });
    }

    // Validate registration status
    if (tournament.status !== 'REGISTRATION') {
      return NextResponse.json({
        success: false,
        message: 'Registration is not open for this tournament'
      }, { status: 400 });
    }

    // Validate required fields
    if (!body.participantId || !body.participantType || !body.participantName) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: participantId, participantType, participantName'
      }, { status: 400 });
    }

    // Check if already registered
    const existingRegistration = mockRegistrations.find(
      r => r.tournamentId === tournamentId && r.participantId === body.participantId
    );
    
    if (existingRegistration) {
      return NextResponse.json({
        success: false,
        message: 'Already registered for this tournament'
      }, { status: 400 });
    }

    // Check participant limit
    const currentRegistrations = mockRegistrations.filter(
      r => r.tournamentId === tournamentId && r.status === 'APPROVED'
    ).length;
    
    if (currentRegistrations >= tournament.maxParticipants) {
      return NextResponse.json({
        success: false,
        message: 'Tournament is full'
      }, { status: 400 });
    }

    // Validate participant type matches tournament format
    if (tournament.format === 'SOLO' && body.participantType !== 'PLAYER') {
      return NextResponse.json({
        success: false,
        message: 'Solo tournaments only accept individual player registrations'
      }, { status: 400 });
    }
    
    if ((tournament.format === 'DUO' || tournament.format === 'SQUAD') && body.participantType !== 'TEAM') {
      return NextResponse.json({
        success: false,
        message: `${tournament.format} tournaments require team registration`
      }, { status: 400 });
    }

    // Create registration
    const newRegistration: TournamentRegistration = {
      id: `reg_${Date.now()}`,
      tournamentId,
      participantId: body.participantId,
      participantType: body.participantType,
      participantName: body.participantName,
      registeredAt: new Date(),
      status: 'PENDING',
      paymentStatus: tournament.entryFee > 0 ? 'PENDING' : 'COMPLETED'
    };

    // Add to mock data
    mockRegistrations.push(newRegistration);

    // Update tournament participant list
    const tournamentToUpdate = mockTournaments.find(t => t.id === tournamentId);
    if (tournamentToUpdate) {
      if (body.participantType === 'TEAM') {
        tournamentToUpdate.registeredTeams.push(body.participantId);
      } else {
        tournamentToUpdate.registeredPlayers.push(body.participantId);
      }
    }

    return NextResponse.json({
      success: true,
      data: newRegistration,
      message: tournament.entryFee > 0 
        ? 'Registration created. Please complete payment to confirm.' 
        : 'Registration successful!'
    }, { status: 201 });

  } catch (error) {
    console.error('Error registering for tournament:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to register for tournament'
    }, { status: 500 });
  }
}

// GET /api/tournaments/[id]/register - Get tournament registrations
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tournamentId = params.id;
    
    const registrations = mockRegistrations.filter(
      r => r.tournamentId === tournamentId
    );

    return NextResponse.json({
      success: true,
      data: {
        registrations,
        stats: {
          total: registrations.length,
          approved: registrations.filter(r => r.status === 'APPROVED').length,
          pending: registrations.filter(r => r.status === 'PENDING').length,
          rejected: registrations.filter(r => r.status === 'REJECTED').length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tournament registrations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch registrations'
    }, { status: 500 });
  }
}
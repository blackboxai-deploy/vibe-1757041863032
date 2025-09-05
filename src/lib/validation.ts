import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  freeFireId: z.string().min(8, 'Free Fire ID must be at least 8 characters').max(12, 'Free Fire ID must be less than 12 characters'),
  freeFireIGN: z.string().min(1, 'Free Fire IGN is required').max(20, 'Free Fire IGN must be less than 20 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Tournament validation schemas
export const tournamentSchema = z.object({
  name: z.string().min(3, 'Tournament name must be at least 3 characters').max(100, 'Tournament name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  gameMode: z.enum(['BR', 'CS', 'RANKED']),
  format: z.enum(['SOLO', 'DUO', 'SQUAD']),
  maxParticipants: z.number().min(4, 'Minimum 4 participants required').max(100, 'Maximum 100 participants allowed'),
  prizePool: z.number().min(0, 'Prize pool cannot be negative'),
  entryFee: z.number().min(0, 'Entry fee cannot be negative'),
  startDate: z.date().min(new Date(), 'Start date must be in the future'),
  endDate: z.date(),
  registrationDeadline: z.date(),
  rules: z.string().min(10, 'Rules must be at least 10 characters')
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
}).refine(data => data.registrationDeadline <= data.startDate, {
  message: "Registration deadline must be before start date",
  path: ["registrationDeadline"]
});

// Team validation schemas
export const teamSchema = z.object({
  name: z.string().min(3, 'Team name must be at least 3 characters').max(30, 'Team name must be less than 30 characters'),
  tag: z.string().min(2, 'Team tag must be at least 2 characters').max(6, 'Team tag must be less than 6 characters').regex(/^[A-Z0-9]+$/, 'Team tag must contain only uppercase letters and numbers'),
  logo: z.string().url('Invalid logo URL').optional()
});

// Player validation schemas
export const playerUpdateSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters').optional(),
  freeFireIGN: z.string().min(1, 'Free Fire IGN is required').max(20, 'Free Fire IGN must be less than 20 characters').optional(),
  avatar: z.string().url('Invalid avatar URL').optional()
});

// Match validation schemas
export const matchResultSchema = z.object({
  participantId: z.string(),
  placement: z.number().min(1, 'Placement must be at least 1'),
  kills: z.number().min(0, 'Kills cannot be negative'),
  deaths: z.number().min(0, 'Deaths cannot be negative'),
  damage: z.number().min(0, 'Damage cannot be negative'),
  survivalTime: z.number().min(0, 'Survival time cannot be negative'),
  screenshot: z.string().url('Invalid screenshot URL').optional()
});

export const disputeSchema = z.object({
  matchId: z.string(),
  disputeType: z.enum(['INCORRECT_RESULT', 'CHEATING', 'TECHNICAL_ISSUE', 'OTHER']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  evidence: z.array(z.string().url('Invalid evidence URL')).optional()
});

// Free Fire ID validation
export const freeFireIdRegex = /^[0-9]{8,12}$/;
export const validateFreeFireId = (id: string): boolean => {
  return freeFireIdRegex.test(id);
};

// Team tag validation
export const teamTagRegex = /^[A-Z0-9]{2,6}$/;
export const validateTeamTag = (tag: string): boolean => {
  return teamTagRegex.test(tag);
};

// Username validation
export const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const validateUsername = (username: string): boolean => {
  return usernameRegex.test(username);
};
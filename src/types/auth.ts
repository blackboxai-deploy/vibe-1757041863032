export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  playerId?: string; // Link to Player profile
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'PLAYER' | 'ORGANIZER' | 'ADMIN' | 'MODERATOR';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  freeFireId: string;
  freeFireIGN: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
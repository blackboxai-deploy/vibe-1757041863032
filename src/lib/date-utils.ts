import { format, formatDistance, formatDistanceToNow, isAfter, isBefore, addDays, addHours } from 'date-fns';

/**
 * Format date for display
 */
export function formatDate(date: Date | string, formatString: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatString);
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'PPP p');
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Get time until event
 */
export function getTimeUntilEvent(eventDate: Date | string): string {
  const dateObj = typeof eventDate === 'string' ? new Date(eventDate) : eventDate;
  const now = new Date();
  
  if (isBefore(dateObj, now)) {
    return 'Event has passed';
  }
  
  return formatDistance(now, dateObj, { addSuffix: true });
}

/**
 * Check if tournament registration is open
 */
export function isRegistrationOpen(tournament: { 
  registrationDeadline: Date; 
  startDate: Date; 
  status: string; 
}): boolean {
  const now = new Date();
  const registrationDeadline = typeof tournament.registrationDeadline === 'string' 
    ? new Date(tournament.registrationDeadline) 
    : tournament.registrationDeadline;
  
  return tournament.status === 'REGISTRATION' && isAfter(registrationDeadline, now);
}

/**
 * Check if tournament is live
 */
export function isTournamentLive(tournament: { 
  startDate: Date; 
  endDate: Date; 
  status: string; 
}): boolean {
  const now = new Date();
  const startDate = typeof tournament.startDate === 'string' 
    ? new Date(tournament.startDate) 
    : tournament.startDate;
  const endDate = typeof tournament.endDate === 'string' 
    ? new Date(tournament.endDate) 
    : tournament.endDate;
  
  return tournament.status === 'LIVE' && 
         isAfter(now, startDate) && 
         isBefore(now, endDate);
}

/**
 * Generate default tournament dates
 */
export function generateDefaultTournamentDates(): {
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
} {
  const now = new Date();
  const startDate = addDays(now, 7); // Tournament starts in 7 days
  const endDate = addHours(startDate, 4); // Tournament lasts 4 hours
  const registrationDeadline = addDays(now, 5); // Registration closes 2 days before start
  
  return {
    startDate,
    endDate,
    registrationDeadline
  };
}

/**
 * Calculate match duration in minutes
 */
export function calculateMatchDuration(startTime: Date, endTime: Date): number {
  const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
  
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

/**
 * Format match duration for display
 */
export function formatMatchDuration(durationMinutes: number): string {
  if (durationMinutes < 60) {
    return `${durationMinutes}m`;
  }
  
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.toDateString() === today.toDateString();
}

/**
 * Get tournament status based on dates
 */
export function getTournamentStatusFromDates(tournament: {
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
}): 'UPCOMING' | 'REGISTRATION' | 'LIVE' | 'COMPLETED' {
  const now = new Date();
  const startDate = typeof tournament.startDate === 'string' 
    ? new Date(tournament.startDate) 
    : tournament.startDate;
  const endDate = typeof tournament.endDate === 'string' 
    ? new Date(tournament.endDate) 
    : tournament.endDate;
  const registrationDeadline = typeof tournament.registrationDeadline === 'string' 
    ? new Date(tournament.registrationDeadline) 
    : tournament.registrationDeadline;
  
  if (isAfter(now, endDate)) {
    return 'COMPLETED';
  }
  
  if (isAfter(now, startDate) && isBefore(now, endDate)) {
    return 'LIVE';
  }
  
  if (isBefore(now, registrationDeadline)) {
    return 'REGISTRATION';
  }
  
  return 'UPCOMING';
}
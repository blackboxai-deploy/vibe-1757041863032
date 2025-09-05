/**
 * Local storage utilities for Free Fire Tournament App
 */

const STORAGE_KEYS = {
  USER_SESSION: 'ff_tournament_user_session',
  TOURNAMENT_FAVORITES: 'ff_tournament_favorites',
  USER_PREFERENCES: 'ff_tournament_preferences',
  MATCH_HISTORY: 'ff_tournament_match_history',
  TEAM_INVITATIONS: 'ff_tournament_team_invitations',
  DRAFT_TOURNAMENT: 'ff_tournament_draft',
  RECENT_SEARCHES: 'ff_tournament_recent_searches'
} as const;

/**
 * Generic storage interface
 */
interface StorageItem<T> {
  data: T;
  timestamp: number;
  expiresAt?: number;
}

/**
 * Save data to localStorage with optional expiration
 */
export function saveToStorage<T>(key: string, data: T, expirationHours?: number): void {
  try {
    const item: StorageItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: expirationHours ? Date.now() + (expirationHours * 60 * 60 * 1000) : undefined
    };
    
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load data from localStorage with expiration check
 */
export function loadFromStorage<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item: StorageItem<T> = JSON.parse(itemStr);
    
    // Check if expired
    if (item.expiresAt && Date.now() > item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Remove item from localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

/**
 * Clear all tournament app data from localStorage
 */
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// Specific storage functions for different data types

/**
 * User session management
 */
export const userSession = {
  save: (session: { user: any; token: string; expiresAt: Date }) => {
    saveToStorage(STORAGE_KEYS.USER_SESSION, session, 24); // 24 hours
  },
  
  load: () => {
    return loadFromStorage<{ user: any; token: string; expiresAt: Date }>(STORAGE_KEYS.USER_SESSION);
  },
  
  clear: () => {
    removeFromStorage(STORAGE_KEYS.USER_SESSION);
  }
};

/**
 * Tournament favorites management
 */
export const tournamentFavorites = {
  add: (tournamentId: string) => {
    const favorites = loadFromStorage<string[]>(STORAGE_KEYS.TOURNAMENT_FAVORITES) || [];
    if (!favorites.includes(tournamentId)) {
      favorites.push(tournamentId);
      saveToStorage(STORAGE_KEYS.TOURNAMENT_FAVORITES, favorites);
    }
  },
  
  remove: (tournamentId: string) => {
    const favorites = loadFromStorage<string[]>(STORAGE_KEYS.TOURNAMENT_FAVORITES) || [];
    const updated = favorites.filter(id => id !== tournamentId);
    saveToStorage(STORAGE_KEYS.TOURNAMENT_FAVORITES, updated);
  },
  
  get: (): string[] => {
    return loadFromStorage<string[]>(STORAGE_KEYS.TOURNAMENT_FAVORITES) || [];
  },
  
  isFavorite: (tournamentId: string): boolean => {
    const favorites = loadFromStorage<string[]>(STORAGE_KEYS.TOURNAMENT_FAVORITES) || [];
    return favorites.includes(tournamentId);
  }
};

/**
 * User preferences management
 */
export const userPreferences = {
  save: (preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
    timezone: string;
  }) => {
    saveToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
  },
  
  load: () => {
    return loadFromStorage<{
      theme: 'light' | 'dark';
      notifications: boolean;
      language: string;
      timezone: string;
    }>(STORAGE_KEYS.USER_PREFERENCES);
  },
  
  getTheme: (): 'light' | 'dark' => {
    const preferences = userPreferences.load();
    return preferences?.theme || 'dark';
  }
};

/**
 * Match history management
 */
export const matchHistory = {
  add: (match: any) => {
    const history = loadFromStorage<any[]>(STORAGE_KEYS.MATCH_HISTORY) || [];
    history.unshift(match); // Add to beginning
    
    // Keep only last 50 matches
    const updated = history.slice(0, 50);
    saveToStorage(STORAGE_KEYS.MATCH_HISTORY, updated, 24 * 7); // 7 days
  },
  
  get: () => {
    return loadFromStorage<any[]>(STORAGE_KEYS.MATCH_HISTORY) || [];
  },
  
  clear: () => {
    removeFromStorage(STORAGE_KEYS.MATCH_HISTORY);
  }
};

/**
 * Team invitations management
 */
export const teamInvitations = {
  save: (invitations: any[]) => {
    saveToStorage(STORAGE_KEYS.TEAM_INVITATIONS, invitations, 24); // 24 hours
  },
  
  load: () => {
    return loadFromStorage<any[]>(STORAGE_KEYS.TEAM_INVITATIONS) || [];
  },
  
  clear: () => {
    removeFromStorage(STORAGE_KEYS.TEAM_INVITATIONS);
  }
};

/**
 * Draft tournament management (for tournament creation)
 */
export const draftTournament = {
  save: (draft: any) => {
    saveToStorage(STORAGE_KEYS.DRAFT_TOURNAMENT, draft, 1); // 1 hour
  },
  
  load: () => {
    return loadFromStorage<any>(STORAGE_KEYS.DRAFT_TOURNAMENT);
  },
  
  clear: () => {
    removeFromStorage(STORAGE_KEYS.DRAFT_TOURNAMENT);
  }
};

/**
 * Recent searches management
 */
export const recentSearches = {
  add: (search: string) => {
    const searches = loadFromStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES) || [];
    
    // Remove if already exists
    const filtered = searches.filter(s => s !== search);
    
    // Add to beginning
    filtered.unshift(search);
    
    // Keep only last 10 searches
    const updated = filtered.slice(0, 10);
    saveToStorage(STORAGE_KEYS.RECENT_SEARCHES, updated, 24 * 30); // 30 days
  },
  
  get: () => {
    return loadFromStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES) || [];
  },
  
  clear: () => {
    removeFromStorage(STORAGE_KEYS.RECENT_SEARCHES);
  }
};
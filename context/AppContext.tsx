
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { liveApi } from '../services/api';

interface AppContextType {
  entryId: number | null;
  currentGameweek: number | null;
  setEntryId: (id: number) => void;
  setCurrentGameweek: (gw: number) => void;
  isLoadingGameweek: boolean;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entryId, setEntryIdState] = useState<number | null>(() => {
    const saved = localStorage.getItem('fpl_entry_id');
    return saved ? parseInt(saved, 10) : null;
  });
  
  const [currentGameweek, setCurrentGameweek] = useState<number | null>(null);
  const [isLoadingGameweek, setIsLoadingGameweek] = useState<boolean>(true);

  useEffect(() => {
    const loadGameweek = async () => {
      try {
        const response = await liveApi.getCurrentGameweek();
        const gwData = response.data; 
        if (gwData && gwData.gameweek) {
          setCurrentGameweek(gwData.gameweek);
        }
      } catch (error) {
        console.warn("Failed to load gameweek (Backend might be offline). Defaulting to GW 1.");
        // Fallback to avoid app breaking if backend is down during dev
        setCurrentGameweek(1); 
      } finally {
        setIsLoadingGameweek(false);
      }
    };
    loadGameweek();
  }, []);

  const setEntryId = (id: number) => {
    setEntryIdState(id);
    localStorage.setItem('fpl_entry_id', id.toString());
  };

  const isAuthenticated = !!entryId;

  return (
    <AppContext.Provider 
      value={{ 
        entryId, 
        currentGameweek, 
        setEntryId, 
        setCurrentGameweek, 
        isLoadingGameweek,
        isAuthenticated 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

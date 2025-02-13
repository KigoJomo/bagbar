// context/ViewPreferenceContext.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ViewType = 'grid' | 'list';

interface ViewPreferenceContextType {
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

const ViewPreferenceContext = createContext<ViewPreferenceContextType | undefined>(undefined);

export const ViewPreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [viewType, setViewType] = useState<ViewType>('grid');

  // Load from localStorage on mount
  useEffect(() => {
    const stored = window.localStorage.getItem('adminViewType');
    if (stored === 'grid' || stored === 'list') {
      setViewType(stored);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    window.localStorage.setItem('adminViewType', viewType);
  }, [viewType]);

  return (
    <ViewPreferenceContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ViewPreferenceContext.Provider>
  );
};

export const useViewPreference = () => {
  const context = useContext(ViewPreferenceContext);
  if (!context) {
    throw new Error('useViewPreference must be used within a ViewPreferenceProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { UserConfigState } from '../types/portfolio';

interface PortfolioConfigContextType {
  config: UserConfigState;
  updateConfig: (newConfig: Partial<UserConfigState>) => void;
  resetConfig: () => void;
  isConfigOpen: boolean;
  openConfig: () => void;
  closeConfig: () => void;
}

const defaultState: UserConfigState = {
  email: PORTFOLIO_CONFIG.personal.email,
  availability: PORTFOLIO_CONFIG.personal.availability,
  githubUrl: PORTFOLIO_CONFIG.personal.githubUrl,
  linkedinUrl: PORTFOLIO_CONFIG.personal.linkedinUrl,
  location: PORTFOLIO_CONFIG.personal.location,
};

const PortfolioConfigContext = createContext<PortfolioConfigContextType | undefined>(undefined);

export const PortfolioConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<UserConfigState>(() => {
    try {
      const saved = localStorage.getItem('mazidul_portfolio_config');
      if (saved) return { ...defaultState, ...JSON.parse(saved) };
    } catch {
      // Ignore localStorage errors
    }
    return defaultState;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mazidul_portfolio_config', JSON.stringify(config));
    } catch {
      // Ignore localStorage errors
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<UserConfigState>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(defaultState);
  };

  return (
    <PortfolioConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isConfigOpen,
        openConfig: () => setIsConfigOpen(true),
        closeConfig: () => setIsConfigOpen(false),
      }}
    >
      {children}
    </PortfolioConfigContext.Provider>
  );
};

export const usePortfolioConfig = () => {
  const ctx = useContext(PortfolioConfigContext);
  if (!ctx) {
    throw new Error('usePortfolioConfig must be used within a PortfolioConfigProvider');
  }
  return ctx;
};

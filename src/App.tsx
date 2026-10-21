import React from 'react';
import { PortfolioConfigProvider } from './context/PortfolioConfigContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <PortfolioConfigProvider>
      <AppRoutes />
    </PortfolioConfigProvider>
  );
};

export default App;

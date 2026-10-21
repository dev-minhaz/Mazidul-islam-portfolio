import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/navigation/Header';
import { Footer } from '../components/footer/Footer';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { ConfigModal } from '../components/config/ConfigModal';
import { usePortfolioConfig } from '../context/PortfolioConfigContext';
import { CyberAtmosphere } from '../components/common/CyberAtmosphere';
import { SecurityVerificationModal } from '../components/verification/SecurityVerificationModal';

export const RootLayout: React.FC = () => {
  const { isConfigOpen, closeConfig, config, updateConfig } = usePortfolioConfig();

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] font-sans selection:bg-[#E50920] selection:text-white flex flex-col justify-between overflow-x-hidden relative">
      {/* Ambient Cybersecurity Canvas & Scanning Overlay */}
      <CyberAtmosphere />

      {/* Security Verification Gateway Modal */}
      <SecurityVerificationModal />

      <ScrollToTop />
      <Header />

      <main id="main-content" className="flex-1 w-full relative z-10">
        <Outlet />
      </main>

      <Footer />

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={closeConfig}
        config={config}
        onSave={(newCfg) => updateConfig(newCfg)}
      />
    </div>
  );
};


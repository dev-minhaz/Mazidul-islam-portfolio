import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../../data/portfolioData';
import { UserConfigState } from '../../types/portfolio';
import { X, Check, RotateCcw, Sliders } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: UserConfigState;
  onSave: (newConfig: UserConfigState) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [localConfig, setLocalConfig] = useState<UserConfigState>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localConfig);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 700);
  };

  const handleReset = () => {
    const defaults: UserConfigState = {
      email: PORTFOLIO_CONFIG.personal.email,
      availability: PORTFOLIO_CONFIG.personal.availability,
      githubUrl: PORTFOLIO_CONFIG.personal.githubUrl,
      linkedinUrl: PORTFOLIO_CONFIG.personal.linkedinUrl,
      location: PORTFOLIO_CONFIG.personal.location,
    };
    setLocalConfig(defaults);
    onSave(defaults);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0D0D0F] border border-[#29292D] rounded-xl shadow-2xl p-6 sm:p-7 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#E50920]" />
            <h2 id="config-modal-title" className="text-base sm:text-lg font-heading font-bold text-white uppercase tracking-tight">
              PORTFOLIO CONFIGURATION
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#707078] hover:text-white rounded border border-[#29292D] transition-colors"
            aria-label="Close configuration modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          Configure personal communication channels and real-time availability. Updates reflect immediately across all pages, footers, intake forms, and headers.
        </p>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
              Primary Contact Email
            </label>
            <input
              type="email"
              value={localConfig.email}
              onChange={(e) => setLocalConfig({ ...localConfig, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#121214] border border-[#29292D] rounded text-white text-xs font-mono-tech focus:outline-none focus:border-[#E50920]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
              Availability Status Tag
            </label>
            <input
              type="text"
              value={localConfig.availability}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, availability: e.target.value })
              }
              className="w-full px-3.5 py-2 bg-[#121214] border border-[#29292D] rounded text-white text-xs font-mono-tech focus:outline-none focus:border-[#E50920]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
              GitHub Profile Link
            </label>
            <input
              type="url"
              value={localConfig.githubUrl}
              onChange={(e) => setLocalConfig({ ...localConfig, githubUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#121214] border border-[#29292D] rounded text-white text-xs font-mono-tech focus:outline-none focus:border-[#E50920]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
              LinkedIn Profile Link
            </label>
            <input
              type="url"
              value={localConfig.linkedinUrl}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, linkedinUrl: e.target.value })
              }
              className="w-full px-3.5 py-2 bg-[#121214] border border-[#29292D] rounded text-white text-xs font-mono-tech focus:outline-none focus:border-[#E50920]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#1E1E22]">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#707078] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono-tech text-[#A1A1AA] hover:text-white border border-[#29292D] rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-white bg-[#E50920] hover:bg-[#FF263F] rounded transition-colors flex items-center gap-1.5"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>APPLIED</span>
                  </>
                ) : (
                  <span>APPLY CHANGES</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

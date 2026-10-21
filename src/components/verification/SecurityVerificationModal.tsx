import React, { useState, useEffect, useId, useRef } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Terminal, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Radio,
  Keyboard,
  Server,
  KeyRound,
  Zap
} from 'lucide-react';

interface AnswerOption {
  id: string;
  letter: string;
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ANSWER_OPTIONS: AnswerOption[] = [
  {
    id: 'keyboard',
    letter: 'A',
    label: 'A keyboard',
    emoji: '⌨️',
    icon: Keyboard
  },
  {
    id: 'server',
    letter: 'B',
    label: 'A server',
    emoji: '🖥️',
    icon: Server
  },
  {
    id: 'password',
    letter: 'C',
    label: 'A secret password',
    emoji: '🔑',
    icon: KeyRound
  }
];

const STORAGE_KEY = 'mzk_sec_verified';

export const SecurityVerificationModal: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(true); // default true to avoid flash while checking
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'denied'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const dialogId = useId();
  const verifyButtonRef = useRef<HTMLButtonElement | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const verified = sessionStorage.getItem(STORAGE_KEY) === 'true';
      if (!verified) {
        setIsVerified(false);
      }
    } catch {
      // Graceful fallback if storage is restricted
      setIsVerified(true);
    }

    // Terminal timestamp clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 200);

    // Allow re-testing via custom event (e.g. from footer)
    const handleReopen = () => {
      setIsVerified(false);
      setIsExiting(false);
      setSelectedAnswer(null);
      setStatus('idle');
      setShowHint(false);
    };

    window.addEventListener('mzk_open_verification', handleReopen);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mzk_open_verification', handleReopen);
    };
  }, []);

  // Handle keyboard shortcut for Enter key submission
  useEffect(() => {
    if (isVerified || isExiting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedAnswer && status !== 'checking' && status !== 'success') {
        e.preventDefault();
        handleVerify();
      } else if (e.key === '1' || e.key === 'a' || e.key === 'A') {
        setSelectedAnswer('keyboard');
      } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
        setSelectedAnswer('server');
      } else if (e.key === '3' || e.key === 'c' || e.key === 'C') {
        setSelectedAnswer('password');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, status, isVerified, isExiting]);

  const handleVerify = () => {
    if (!selectedAnswer || status === 'checking' || status === 'success') return;

    setStatus('checking');

    // Quick verification check
    setTimeout(() => {
      if (selectedAnswer === 'keyboard') {
        // Correct answer: A keyboard
        setStatus('success');
        try {
          sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // ignore
        }

        // Transition smoothly into portfolio after short unlock sequence
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVerified(true);
          }, 500);
        }, 1100);
      } else {
        // Wrong answer
        setStatus('denied');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 350);
  };

  const handleBypass = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setIsExiting(true);
    setTimeout(() => setIsVerified(true), 350);
  };

  if (isVerified && !isExiting) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${dialogId}-title`}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 overflow-y-auto ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Deep dark cyberpunk backdrop with electric navy & cyan glow */}
      <div 
        className="fixed inset-0 bg-[#05070B]/95 backdrop-blur-xl"
        aria-hidden="true"
      />

      {/* Cyber ambient glow orbs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/5 blur-3xl pointer-events-none" />

      {/* Centered Hacker Puzzle Card */}
      <div 
        className={`relative w-full max-w-xl my-auto bg-[#0A0E17]/95 border border-[#1B2738] rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden transition-all duration-300 ${
          shake ? 'animate-[shake_0.4s_ease-in-out]' : ''
        } ${
          status === 'success' 
            ? 'border-emerald-500/60 shadow-emerald-950/60 ring-2 ring-emerald-500/30' 
            : status === 'denied' 
            ? 'border-amber-500/60 shadow-amber-950/40' 
            : 'hover:border-cyan-500/40'
        }`}
      >
        {/* Animated Top Laser Scanning Line */}
        <div className="relative h-1 w-full bg-[#0E1726] overflow-hidden">
          <div 
            className={`h-full ${
              status === 'success'
                ? 'w-full bg-emerald-400'
                : status === 'denied'
                ? 'w-full bg-amber-500'
                : 'w-1/3 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-[scan_2.2s_ease-in-out_infinite]'
            }`} 
          />
        </div>

        {/* Card Header & Cyber Terminal Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-[#162030] bg-[#070B12]/60">
          <div className="flex items-center justify-between gap-3 mb-2">
            {/* Top Eyebrow Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MY CYBERSECURITY PORTFOLIO
              </span>
            </div>

            {/* EASY MODE Badge + Terminal Time */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 tracking-wider">
                EASY MODE
              </span>
              <span className="hidden sm:inline text-[10px] font-mono text-neutral-400">
                {currentTime}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${dialogId}-title`} className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>HACKER CHALLENGE — LEVEL 01</span>
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300/80 font-medium mt-1">
                Before entering, let&apos;s see if you can crack this simple challenge.
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Complete this quick security puzzle to access my portfolio.
              </p>
            </div>

            {/* Padlock / Shield Icon with dynamic unlock animation */}
            <div className="shrink-0">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                status === 'success'
                  ? 'bg-emerald-950/50 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                  : status === 'denied'
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 animate-bounce'
                  : 'bg-[#0E1726] border-cyan-500/30 text-cyan-400'
              }`}>
                {status === 'success' ? (
                  <Unlock className="w-6 h-6 animate-pulse text-emerald-400" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Puzzle Card Content */}
        <div className="p-6 space-y-5">
          {/* Terminal Command Simulation Line */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#05080E] border border-[#141E2E] text-[11px] font-mono text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-cyan-400 font-semibold">root@portfolio:~$</span>
            <span className="text-neutral-300">execute ./security_riddle.sh --level=1</span>
            <span className="terminal-cursor text-cyan-400">_</span>
          </div>

          {/* The Exact Riddle Container */}
          <div className="relative p-5 rounded-xl bg-gradient-to-b from-[#0D1424] to-[#090E1A] border border-cyan-500/25 shadow-inner">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>HACKER CHALLENGE</span>
            </div>

            <blockquote className="text-sm sm:text-base font-semibold text-white leading-relaxed space-y-1">
              <p className="text-cyan-100">&ldquo;I have keys, but no locks.</p>
              <p className="text-cyan-100">I have a space, but no room.</p>
              <p className="text-cyan-100">You can enter, but cannot walk inside.</p>
              <p className="text-white font-bold pt-1">What am I?&rdquo;</p>
            </blockquote>
          </div>

          {/* Three Interactive Answer Options */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-cyan-400 font-medium">CHOOSE YOUR ANSWER</span>
              <span className="text-[11px] text-neutral-500">Keys: [1, 2, 3] or click</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ANSWER_OPTIONS.map((option) => {
                const IconComponent = option.icon;
                const isSelected = selectedAnswer === option.id;

                let cardStyle = 'bg-[#0D1322] border-[#1A263A] text-neutral-300 hover:border-cyan-500/40 hover:bg-[#121B2F]';

                if (isSelected) {
                  if (status === 'success') {
                    cardStyle = 'bg-emerald-950/40 border-emerald-400 text-white ring-2 ring-emerald-500/50';
                  } else if (status === 'denied') {
                    cardStyle = 'bg-amber-950/30 border-amber-500 text-amber-200 ring-1 ring-amber-500/40';
                  } else {
                    cardStyle = 'bg-cyan-950/40 border-cyan-400 text-white ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/10';
                  }
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      if (status === 'checking' || status === 'success') return;
                      setSelectedAnswer(option.id);
                      if (status === 'denied') {
                        setStatus('idle'); // clear error when user changes option
                      }
                    }}
                    disabled={status === 'checking' || status === 'success'}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-[0.99] cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Letter badge */}
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors shrink-0 ${
                        isSelected 
                          ? status === 'success' 
                            ? 'bg-emerald-500 text-black' 
                            : 'bg-cyan-400 text-black' 
                          : 'bg-[#152033] border border-[#22324C] text-neutral-400 group-hover:text-cyan-300'
                      }`}>
                        {option.letter}
                      </span>

                      {/* Icon */}
                      <div className="p-1.5 rounded-md bg-[#131E33] border border-[#202F49] text-cyan-400 shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Label + Emoji */}
                      <span className="text-sm font-semibold tracking-wide truncate">
                        {option.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-lg" aria-hidden="true">{option.emoji}</span>
                      {isSelected && status === 'success' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {isSelected && status === 'denied' && (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hint Area */}
          <div className="pt-1">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400/90 hover:text-cyan-300 transition-colors cursor-pointer py-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need a Hint?</span>
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-xs font-mono text-cyan-200 flex items-start gap-2.5 animate-fadeIn">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-400 mr-1.5">HINT:</span>
                  <span>Think about the device you&apos;re using to type your answer.</span>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Messages */}
          {status === 'denied' && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 text-xs font-mono text-amber-200 flex items-center gap-2.5 animate-fadeIn">
              <span className="text-base">😜</span>
              <div className="flex-1">
                <span className="font-bold text-amber-400 block sm:inline mr-1">ACCESS DENIED</span>
                <span>Nice try, hacker! Give it another shot.</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-400/60 text-xs font-mono text-emerald-200 flex items-center gap-2.5 animate-fadeIn shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
              <div>
                <div className="font-black text-sm text-emerald-400 tracking-wider">ACCESS GRANTED</div>
                <div className="text-emerald-200 mt-0.5">Identity of a true keyboard warrior confirmed! 😎 Entering portfolio...</div>
              </div>
            </div>
          )}

          {/* Action Buttons: "Verify & Enter" */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              ref={verifyButtonRef}
              type="button"
              onClick={handleVerify}
              disabled={!selectedAnswer || status === 'checking' || status === 'success'}
              className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                status === 'success'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 cursor-default'
                  : selectedAnswer
                  ? 'bg-gradient-to-r from-cyan-500 via-[#00F0FF] to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black shadow-lg shadow-cyan-500/30 active:scale-[0.99]'
                  : 'bg-[#152033] text-neutral-500 border border-[#22324C] cursor-not-allowed opacity-60'
              }`}
            >
              {status === 'checking' ? (
                <>
                  <Radio className="w-4 h-4 animate-spin text-black" />
                  <span>Validating Key...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Verify &amp; Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Direct access bypass for accessibility / quick bypass */}
            <button
              type="button"
              onClick={handleBypass}
              className="text-[11px] font-mono text-neutral-500 hover:text-neutral-400 transition-colors py-1 px-2 cursor-pointer"
              title="Skip puzzle and enter immediately"
            >
              Skip to Portfolio →
            </button>
          </div>
        </div>

        {/* Modal Bottom Cyber Status Bar */}
        <div className="px-6 py-3 bg-[#060911] border-t border-[#141E2E] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400/80">AUTHENTICATION GATEWAY</span>
          </div>
          <div>
            <span>PORTFOLIO // MAZIDUL ISLAM KHAN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

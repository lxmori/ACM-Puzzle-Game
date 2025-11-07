import { useState } from 'react';
import './App.css';
import CipherGuidelinesModal from './CipherGuidelinesModal';
import CipherQuestionsModal from './CipherQuestionsModal';

interface CipherBridgeProps {
  onPhaseComplete: () => void;
  phase: number;
}

function CipherBridge({ onPhaseComplete, phase }: CipherBridgeProps) {
  // State management
  const [userInput, setUserInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  // Define passwords for each phase
  const passwords = {
    1: 'POJVS',
    2: 'YKBAXK'
  };

  const currentPassword = passwords[phase as keyof typeof passwords] || '';

  // Handle password submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (timeLeft > 0) return; // Prevent submission during lockout
    
    if (userInput.trim().toUpperCase() === currentPassword) {
      // Password is correct
      setIsUnlocked(true);
    } else {
      // Password is incorrect - trigger 10-second lockout
      setShowError(true);
      setTimeLeft(10);
      
      // Clear the input
      setUserInput('');
      
      // Set up the countdown timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowError(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Handle proceeding to next stage
  const handleProceed = () => {
    onPhaseComplete();
  };



  // Main application UI
  return (
    <div className="h-full flex flex-col justify-around items-center overflow-hidden">
      {/* Header with title and modal buttons */}
      <div className="h-[122px] mt-[25px] md:h-[122px]">
        <div className="flex flex-col md:flex-row justify-around items-center gap-2 md:gap-0">
          <h1 className="text-[30px] md:text-[50px] font-['Fjalla'] text-[#FF5EDC]">CIPHER-BRIDGE</h1>
        </div>
        {/* Phase indicator */}
        <div className="text-center md:text-left">
          <p className="text-[18px] md:text-[25px] font-['Fjalla'] text-gray-700">
            Phase {phase}
          </p>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 overflow-auto">
        {/* Cipher Interface - shown during active puzzle */}
        <div className="flex flex-col items-center w-full max-w-md">
          {/* Lock Interface */}
          <div className="mb-8 relative">
            <div className={`w-20 h-24 md:w-32 md:h-36 ${isUnlocked ? 'bg-green-600' : 'bg-gray-800'} rounded-t-full flex items-center justify-center relative transition-colors duration-500`}>
              <div className={`w-16 h-20 md:w-24 md:h-28 ${isUnlocked ? 'bg-green-700' : 'bg-gray-900'} rounded-t-full flex items-center justify-center transition-colors duration-500`}>
                <div className={`w-12 h-12 md:w-16 md:h-16 ${isUnlocked ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center transition-colors duration-500`}>
                  {isUnlocked ? (
                    <div className="text-white text-lg md:text-2xl">✓</div>
                  ) : (
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <div className={`absolute -bottom-4 md:-bottom-6 w-16 md:w-24 h-5 md:h-6 ${isUnlocked ? 'bg-green-600' : 'bg-gray-800'} rounded-b-lg transition-colors duration-500`}></div>
            </div>
            
            {/* Shackle */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 md:w-16 h-12 md:h-16 ${isUnlocked ? 'border-6 md:border-8 border-green-600' : 'border-6 md:border-8 border-gray-800'} rounded-full transition-colors duration-500`}></div>
            
            {isUnlocked && (
              <div className="absolute -bottom-8 md:-bottom-12 text-green-600 font-bold text-base md:text-lg">UNLOCKED!</div>
            )}
          </div>
          
          {!isUnlocked ? (
            // Password Input (only show when not unlocked)
            <form onSubmit={handleSubmit} className="w-full max-w-full">
              <div className="mb-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter cipher password..."
                  className={`w-full px-3 md:px-4 py-2 md:py-3 text-base md:text-lg border-2 rounded-lg focus:outline-none focus:border-[#FF5EDC] bg-white text-black ${
                    timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={timeLeft > 0 || isUnlocked}
                  autoFocus
                />
              </div>
              
              {showError && timeLeft > 0 && (
                <div className="mb-4 text-red-600 text-center text-sm md:text-base">
                  Incorrect password. Try again in {timeLeft} seconds.
                </div>
              )}
              
              {timeLeft > 0 && (
                <div className="mb-4 text-center">
                  <p className="text-red-600 text-sm md:text-base">Locked for {timeLeft} seconds...</p>
                </div>
              )}
              
              <button
                type="submit"
                className={`w-full py-2 md:py-3 bg-[#FF5EDC] text-white rounded-lg transition text-base md:text-lg font-bold ${
                  timeLeft > 0 || isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
                disabled={timeLeft > 0 || isUnlocked}
              >
                Unlock
              </button>
            </form>
          ) : (
            // Show unlocked message with proceed button
            <div className="text-center">
              <p className="text-green-600 text-lg md:text-xl font-bold mb-4">UNLOCKED!</p>
              <button
                onClick={handleProceed}
                className="px-4 md:px-6 py-2 md:py-3 bg-[#FF5EDC] text-white rounded-lg hover:bg-blue-600 transition text-base md:text-lg font-bold"
              >
                Proceed to Next Stage
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buttons to open modals */}
      <div className="flex flex-col md:flex-row gap-3 mb-[30px] md:mb-[50px] font-['Fjalla']">
        <button 
          onClick={() => setShowGuidelines(true)}
          className="cursor-pointer px-3 md:px-4 border border-[#FF5EDC ] py-1 md:py-2 text-black rounded-lg hover:bg-green-600 transition text-xs md:text-sm"
        >
          Guidelines
        </button>
        <button 
          onClick={() => setShowQuestions(true)}
          className="cursor-pointer px-3 md:px-4 py-1 md:py-2 bg-[#FF5EDC] text-white rounded-lg hover:bg-blue-600 transition text-xs md:text-sm"
        >
          Shifts & Keys
        </button>
      </div>
      
      {/* Modal components - separated into their own files */}
      <CipherGuidelinesModal 
        isOpen={showGuidelines} 
        onClose={() => setShowGuidelines(false)} 
      />
      <CipherQuestionsModal 
        isOpen={showQuestions} 
        onClose={() => setShowQuestions(false)} 
        phase={phase}
      />
    </div>
  );
}

export default CipherBridge;
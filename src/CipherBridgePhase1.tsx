import { useState } from 'react';
import CipherBridge from './CipherBridge';

interface CipherBridgePhase1Props {
  onPhaseComplete: () => void;
}

function CipherBridgePhase1({ onPhaseComplete }: CipherBridgePhase1Props) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [allCompleted, setAllCompleted] = useState(false);

  const handlePhaseComplete = () => {
    if (currentPhase === 1) {
      // Move to phase 2 after phase 1 completion
      setCurrentPhase(2);
    } else {
      // Both phases completed
      setAllCompleted(true);
      // Call the parent's onPhaseComplete callback when all phases are completed
      onPhaseComplete();
    }
  };

  if (allCompleted) {
    return (
      <div className="h-full flex flex-col justify-around items-center overflow-hidden">
        {/* Header with title */}
        <div className="h-[122px] mt-[25px] md:h-[122px]">
          <div className="flex flex-col md:flex-row justify-around items-center gap-2 md:gap-0">
            <h1 className="text-[30px] md:text-[50px] font-['Fjalla'] text-[#FF5EDC]">CIPHER-BRIDGE</h1>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[18px] md:text-[25px] font-['Fjalla'] text-gray-700">
              Completed!
            </p>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col items-center justify-center p-4 overflow-auto">
          <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-3 md:mb-4">Congratulations!</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-4">You passed the Cipher Bridge!</p>
          </div>
        </div>

        {/* Buttons to open modals - hidden on completion */}
        <div className="flex gap-3 mb-[50px] font-['Fjalla'] opacity-0">
          <button 
            className="cursor-pointer px-4 border border-[#FF5EDC ] py-2 text-black rounded-lg hover:bg-green-600 transition text-sm"
          >
            Guidelines
          </button>
          <button 
            className="cursor-pointer px-4 py-2 bg-[#FF5EDC] text-white rounded-lg hover:bg-blue-600 transition text-sm"
          >
            Shifts & Keys
          </button>
        </div>
      </div>
    );
  }

  return (
    <CipherBridge
      key={currentPhase} // This forces the component to re-render with fresh state when phase changes
      phase={currentPhase}
      onPhaseComplete={handlePhaseComplete}
    />
  );
}

export default CipherBridgePhase1;
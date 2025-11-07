import { useState } from 'react';
import './App.css';
import Grid from './Grid';
import GuidelinesModal from './GuidelinesModal';
import QuestionsModal from './QuestionsModal';

interface GridPageProps {
  onGridComplete: () => void;
}

function GridPage({ onGridComplete }: GridPageProps) {
  // State management
  const [currentPhase, setCurrentPhase] = useState(0); // Tracks the current game phase
  const [puzzleComplete, setPuzzleComplete] = useState(false); // Tracks if the grid puzzle is completed
  const [showGuidelines, setShowGuidelines] = useState(false); // Controls guidelines modal visibility
  const [showQuestions, setShowQuestions] = useState(false); // Controls questions modal visibility

  // Define total number of phases
  const totalPhases = 3; // Phases 0, 1, 2 - This can be modified to add more phases

  // Handle when a phase is completed
  const handlePhaseComplete = () => {
    if (currentPhase < totalPhases - 1) {
      // Move to next phase
      setCurrentPhase(prev => prev + 1);
    } else {
      // All grid phases are complete
      setPuzzleComplete(true);
      // Notify parent component that gridlock is complete
      setTimeout(() => {
        onGridComplete();
      }, 2500); // Slight delay to show completion message
    }
  };

  // Reset the entire puzzle to initial state
  const resetPuzzle = () => {
    setCurrentPhase(0);
    setPuzzleComplete(false);
  };

  // Main application UI
  return (
    <div className="h-full flex flex-col justify-around items-center overflow-hidden">
      {/* Header with title and modal buttons */}
      <div className="h-[122px] mt-[25px]">
        <div className="flex justify-around items-center">
          <h1 className="text-[50px] font-['Fjalla'] text-[#FF5EDC]">GRIDLOCK</h1>
        </div>
        {/* Phase indicator */}
        <div className="">
          <p className="text-[25px] font-['Fjalla'] text-gray-700">
            Layer {currentPhase + 1}
          </p>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 overflow-auto">
        {/* Completion screen - shown after all phases are completed */}
        {puzzleComplete ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Gridlock Complete!</h2>
            <p className="text-xl text-gray-700 mb-6">You've completed all gridlock layers.</p>
            <p className="text-xl text-gray-700 mb-6">Proceeding to Cipher Bridge Phase 1...</p>
          </div>
        ) : (
          // Game screen - shown during active gameplay
          <div className="flex flex-col items-center">
            {/* Grid component - the main game area */}
            <Grid 
              currentPhase={currentPhase}
              onPhaseComplete={handlePhaseComplete}
            />
          </div>
        )}
      </div>

      {/* Buttons to open modals */}
      <div className="flex gap-3 mb-[50px] font-['Fjalla']">
        <button 
          onClick={() => setShowGuidelines(true)}
          className="cursor-pointer px-4 border border-[#FF5EDC ] py-2 text-black rounded-lg hover:bg-green-600 transition text-sm"
        >
          Guidelines
        </button>
        <button 
          onClick={() => setShowQuestions(true)}
          className="cursor-pointer px-4 py-2 bg-[#FF5EDC] text-white rounded-lg hover:bg-blue-600 transition text-sm"
        >
          Questions
        </button>
      </div>
      
      {/* Modal components - separated into their own files */}
      <GuidelinesModal 
        isOpen={showGuidelines} 
        onClose={() => setShowGuidelines(false)} 
      />
      <QuestionsModal 
        isOpen={showQuestions} 
        onClose={() => setShowQuestions(false)} 
        currentPhase={currentPhase} 
        />

    </div>
  );
}

export default GridPage;
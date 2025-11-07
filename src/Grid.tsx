import { useState, useEffect } from 'react';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

interface GridCell {
  row: number;
  col: number;
  locked: boolean;
  timeLeft: number | null;
}

interface GridProps {
  currentPhase: number; // Current game phase (0-indexed)
  onPhaseComplete: () => void; // Callback when the phase is completed
}

const Grid: React.FC<GridProps> = ({ currentPhase, onPhaseComplete }) => {
  // Define the target cells for each phase (0-indexed internally, but corresponds to 1-indexed for display)
  // Phase 0: Layer 1 (7,4) - (6,3) internally
  // Phase 1: Layer 2 (5,8) - (4,7) internally 
  // Phase 2: Layer 3 (5,1) - (4,0) internally
  const phaseTargets = [
    { row: 6, col: 3 }, // Phase 0: Target cell (7,4) - 0-indexed
    { row: 4, col: 7 }, // Phase 1: Target cell (5,8) - 0-indexed
    { row: 4, col: 0 }, // Phase 2: Target cell (5,1) - 0-indexed
    // Add more phases here if needed in the future
  ];
  
  const [targetRow, targetCol] = [phaseTargets[currentPhase].row, phaseTargets[currentPhase].col];
  
  // Initialize the grid - 10x10 with all cells unlocked initially
  const [gridCells, setGridCells] = useState<GridCell[][]>(() => {
    const grid: GridCell[][] = [];
    for (let i = 0; i < 10; i++) {
      const row: GridCell[] = [];
      for (let j = 0; j < 10; j++) {
        row.push({ row: i, col: j, locked: false, timeLeft: null });
      }
      grid.push(row);
    }
    return grid;
  });
  
  // State for error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTimeLeft, setErrorTimeLeft] = useState(0);
  
  // State for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // State to track if the whole grid is disabled
  const [isGridDisabled, setIsGridDisabled] = useState(false);

  // Handle when a cell is clicked
  const handleCellClick = (row: number, col: number) => {
    // Check if the grid is currently disabled
    if (isGridDisabled) {
      return;
    }
    
    // Check if the clicked cell is the target cell
    if (row === targetRow && col === targetCol) {
      // Disable the grid and show success modal
      setIsGridDisabled(true);
      setShowSuccessModal(true);
      return;
    }
    
    // Lock the entire grid for 10 seconds when a wrong cell is clicked
    setIsGridDisabled(true);
    
    // Update all cells to be locked
    setGridCells(prev => {
      return prev.map(row => 
        row.map(cell => ({
          ...cell,
          locked: true,
          timeLeft: 10
        }))
      );
    });
    
    // Show error modal with timer
    setErrorTimeLeft(10);
    setShowErrorModal(true);
  };

  // Handle countdown timer for the entire grid
  useEffect(() => {
    let gridTimer: NodeJS.Timeout | null = null;
    
    if (isGridDisabled && showErrorModal && errorTimeLeft > 0) {
      gridTimer = setInterval(() => {
        setErrorTimeLeft(prev => {
          if (prev <= 1) {
            if (gridTimer) clearInterval(gridTimer);
            // Re-enable the grid after countdown
            setIsGridDisabled(false);
            // Reset all cells to unlocked
            setGridCells(currentGrid => 
              currentGrid.map(row => 
                row.map(cell => ({
                  ...cell,
                  locked: false,
                  timeLeft: null
                }))
              )
            );
            setShowErrorModal(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (errorTimeLeft <= 0 && showErrorModal) {
      // Re-enable the grid after countdown
      setIsGridDisabled(false);
      setShowErrorModal(false);
    }

    return () => {
      if (gridTimer) clearInterval(gridTimer);
    };
  }, [isGridDisabled, errorTimeLeft, showErrorModal]);

  // Function to handle continuing to the next phase
  const handleContinueToNextPhase = () => {
    setShowSuccessModal(false);
    setIsGridDisabled(false);
    onPhaseComplete();
  };

  // Render the grid and modals
  return (
    <div className="relative">
      {/* 10x10 Grid */}
      <div className={`border-4 border-gray-800 p-2 bg-gray-100 shadow-lg ${isGridDisabled ? 'opacity-70' : ''}`}>
        {gridCells.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-12 h-12 border border-gray-700 flex items-center justify-center
                  ${isGridDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  transition-colors duration-200
                  ${cell.locked 
                    ? 'bg-red-200 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-200'}
                `}
                onClick={() => !isGridDisabled ? handleCellClick(rowIndex, colIndex) : undefined}
              >
                {cell.locked && cell.timeLeft !== null && cell.timeLeft > 0 && (
                  <span className="text-sm font-bold text-red-600">{cell.timeLeft}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Error Modal component */}
      <ErrorModal 
        isOpen={showErrorModal} 
        timeLeft={errorTimeLeft} 
        onClose={() => {
          // Also reset grid state when modal is closed
          setIsGridDisabled(false);
          setGridCells(currentGrid => 
            currentGrid.map(row => 
              row.map(cell => ({
                ...cell,
                locked: false,
                timeLeft: null
              }))
            )
          );
          setShowErrorModal(false);
        }}
      />
      
      {/* Success Modal component */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onContinue={handleContinueToNextPhase}
      />
    </div>
  );
};

export default Grid;
import { useState, useEffect } from 'react';
import GridPage from './GridPage';
import CipherBridgePhase1 from './CipherBridgePhase1';

function App() {
  const [currentView, setCurrentView] = useState<'gridlock' | 'cipher-bridge'>('gridlock');

  // This effect handles the transition to cipher bridge after gridlock is complete
  useEffect(() => {
    if (currentView === 'cipher-bridge') {
      // Optionally handle what happens after cipher is completed
      // For now, we just show the completion
    }
  }, [currentView]);

  return (
    <>
      {currentView === 'gridlock' ? (
        <GridPage 
          onGridComplete={() => {
            setTimeout(() => {
              setCurrentView('cipher-bridge');
            }, 2500); // Delay to show gridlock completion message
          }} 
        />
      ) : (
        <CipherBridgePhase1 
          onPhaseComplete={() => {
            // Both cipher phases completed - could show final completion or reset
            console.log("Cipher Bridge completed!");
          }}
        />
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";

interface CipherQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase: number;
}

const CipherQuestionsModal: React.FC<CipherQuestionsModalProps> = ({
  isOpen,
  onClose,
  phase,
}) => {
  if (!isOpen) return null;

  // State for tracking which image is expanded
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Define content for each phase
  const phaseContent = {
    1: {
      string: "/keys/key1.jpg",
      shift: "Convert the decimal number 45 into binary. Count the total number of 1 bits and the total number of 0 bits. Multiply the number of 1 bits by 3, then subtract the number of 0 bits. The result is your final number."
    },
    2: {
      string: "/keys/key2.jpg",
      shift: "Along a winding trail at the edge of dawn, three travelers, Alex, Blake, and Casey, came upon three paths, numbered 1, 2, and 3, stretching from left to right. Each path led to a different fate, and no two travelers could walk the same one. Yet the wind whispered its rules: Alex must not tread the first path. Blake must journey to the right of Alex. Casey must not walk beside Blake."
    }
  };

  const currentContent = phaseContent[phase as keyof typeof phaseContent] || phaseContent[1];

  // Toggle image expansion
  const toggleImage = (imageId: string) => {
    setExpandedImage(expandedImage === imageId ? null : imageId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6 overflow-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-3xl font-bold text-gray-800">
            CIPHER-BRIDGE — Shifts & Keys - Phase {phase}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* String - Previously Shift */}
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-200 flex flex-col items-center">
            <h5 className="font-bold text-lg text-gray-800 mb-2">String</h5>
            <div className="relative w-full flex justify-center">
              <img 
                src={currentContent.string} 
                alt={`String ${phase}`}
                className={`cursor-pointer max-h-48 object-contain rounded transition-all duration-300 ${
                  expandedImage === 'string' ? 'fixed inset-0 w-4/5 h-4/5 m-auto z-50' : 'w-full'
                }`}
                onClick={() => toggleImage('string')}
              />
              {expandedImage === 'string' && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-75 z-40"
                  onClick={() => setExpandedImage(null)}
                ></div>
              )}
            </div>
          </div>

          {/* Shift - Previously Key */}
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-200">
            <h5 className="font-bold text-lg text-gray-800 mb-2">Shift</h5>
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentContent.shift}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 border-t pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CipherQuestionsModal;
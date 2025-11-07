import React from 'react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: string; // Optional content to display instead of default
  title?: string; // Optional title for the modal
}

const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose, content, title = "Guidelines" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{title}</h3>
        <div className="space-y-3 text-gray-700 mb-4">
          {content ? (
            // Display dynamic content if provided
            <p>{content}</p>
          ) : (
            // Default content if none provided
            <>
              <p>1. You will be presented with a 10x10 grid.</p>
              <p>2. Each phase requires you to find a specific cell in the grid.</p>
              <p>3. If you click the wrong cell, it will be locked for 10 seconds.</p>
              <p>4. Find the correct cell to advance to the next phase.</p>
              <p>5. Complete all phases to finish the puzzle!</p>
            </>
          )}
        </div>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesModal;
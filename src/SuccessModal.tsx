import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold text-green-600 mb-4 border-b pb-2">Correct Cell!</h3>
        <p className="mb-4">You clicked the correct cell! Ready to move to the next layer?</p>
        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Continue to Next Layer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
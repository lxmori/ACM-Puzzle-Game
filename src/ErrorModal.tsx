import React from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  timeLeft: number;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, timeLeft, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">Wrong Cell!</h3>
        <p className="mb-4">You clicked the wrong cell! This grid is locked for 10 seconds.</p>
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-red-600">Time remaining: {timeLeft}s</p>
        </div>
        <div className="flex justify-end">
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
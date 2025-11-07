import React from "react";

interface CipherGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CipherGuidelinesModal: React.FC<CipherGuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-lg md:max-w-3xl w-full relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-xl md:text-3xl font-bold text-gray-800">
            CIPHER-BRIDGE — Guidelines
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl md:text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Guidelines Content */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">Overview</h4>
            <p className="mb-3 text-sm md:text-base">
              After clearing all three Gridlock layers, the team advances to the Cipher Bridge phase.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">Mechanic</h4>
            <ul className="list-disc pl-4 md:pl-6 mb-3 space-y-2 text-sm md:text-base">
              <li>At each stage, two new puzzles are presented</li>
              <li>One sub-group will solve for the "Shift Key" (a numeric answer)</li>
              <li>The other sub-group will solve for the "Message" (a string/text answer)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">Progression</h4>
            <p className="mb-3 text-sm md:text-base">
              The team must use the provided rule (Caesar Cipher) to apply the "Key" to the "Message." 
              This will create a single, combined password for submission in an input field.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">Caesar Cipher Rule</h4>
            <p className="mb-3 text-sm md:text-base">
              The Caesar Cipher shifts each letter in the message by the number of positions specified by the key. 
              For example, with a key of 3, A becomes D, B becomes E, etc. The shift wraps around the alphabet 
              (X becomes A, Y becomes B, Z becomes C).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">Penalty</h4>
            <p className="text-sm md:text-base">
              Submitting an incorrect password will trigger a 10-second lockout. During this time, 
              you cannot submit any new passwords.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 md:mt-8 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CipherGuidelinesModal;
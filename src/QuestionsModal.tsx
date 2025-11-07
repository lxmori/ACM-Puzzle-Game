import React from "react";

interface QuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhase: number; // now receives the phase directly
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
  isOpen,
  onClose,
  currentPhase,
}) => {
  if (!isOpen) return null;

  const layerData = [
    {
      title: "Layer 1",
      rowQuestion: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 3 != 0) {
            sum += 1;
        }
    }
    printf("%d", sum);
}`,
      colQuestion:
        "Convert the decimal number 95 into its binary form. Count the number of 1’s, multiply that count by 7, and subtract the number of 0’s. Then subtract 37 from the result. Your final answer is your column number.",
    },
    {
      title: "Layer 2",
      rowQuestion: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {3,1,4,1,5,9,2};
    int sum = 0;
    for (int i = 0; i < 7; i++) {
        sum += (arr[i] * (i * 1)) % 5;
        if (i % 2 == 0) {
            sum -= 1;
        }
    }
    cout << sum;
    return 0;
}`,
      colQuestion:
        "Convert the octal number 66 into decimal. Add the digits of that result together, then multiply by 7. Subtract today’s date (the day of the month), then divide the result by 7. The final result is your column number.",
    },
    {
      title: "Layer 3",
      rowQuestion: `public class q3a {
    public static void main(String[] args) {
        int res = 1;
        for (int i = 1; i <= 6; i++) {
            res = (res * i) % 97;
            res = res ^ (i * 3);
            if (i % 2 == 0)
                res = (res / 2) + 5;
        }
        res /= 4;
        System.out.println(res % 100);
    }
}`,
      colQuestion:
        "Consider the Boolean expression: (P ∧ ¬Q) ∨ (Q ⊕ R). Create a full truth table for all 8 possible combinations of P, Q, and R. Count the total number of True outputs (T) and False outputs (F). Then compute 7T - 11F - 1. The result is your column number.",
    },
  ];

  const current = layerData[currentPhase]; // use currentPhase to select question

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6 overflow-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-3xl font-bold text-gray-800">
            GRIDLOCK — {current.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Questions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Row Question */}
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-200">
            <h5 className="font-bold text-lg text-gray-800 mb-2">Row Question</h5>
            <div className="bg-[#1e1e1e] p-1 rounded overflow-x-auto">
              <pre className="text-[#c5f467] text-[13px] p-3 rounded font-mono whitespace-pre overflow-hidden text-left">
                {current.rowQuestion}
              </pre>
            </div>
          </div>

          {/* Column Question */}
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-200">
            <h5 className="font-bold text-lg text-gray-800 mb-2">Column Question</h5>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {current.colQuestion}
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

export default QuestionsModal;

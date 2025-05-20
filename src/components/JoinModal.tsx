import React from "react";
import RegisterForm from "./RegisterForm";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] border border-purple-500 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-purple-400 mb-2">
          🚀 Join JupBoard
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Register your wallet and GitHub to start earning reputation.
        </p>

        <RegisterForm />
      </div>
    </div>
  );
};

export default JoinModal;

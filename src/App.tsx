import { Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import JoinModal from "./components/JoinModal";
import { useState } from "react";

function App() {
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0c1f38] to-[#121e2b] text-white font-sans">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center space-y-20 px-4 pb-12">
              {/* Hero Section */}
              <div className="text-center mt-16">
                <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md flex items-center justify-center gap-3">
                  <span className="text-4xl md:text-5xl">🌌</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    JupBoard
                  </span>
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
                  Track, score and showcase contributors across the Jupiverse DAO ecosystem.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setJoinModalOpen(true)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold shadow-md transition duration-300"
                  >
                    Join Now
                  </button>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="w-full max-w-6xl">
                <Leaderboard />
              </div>

              {/* Modal */}
              <JoinModal isOpen={isJoinModalOpen} onClose={() => setJoinModalOpen(false)} />
            </div>
          }
        />
        <Route path="/profile/:github" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

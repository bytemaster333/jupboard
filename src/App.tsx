import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile"; // henüz oluşturmadık

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center space-y-10">
              <h1 className="text-4xl font-bold">🌌 JupBoard</h1>
              <RegisterForm />
              <Leaderboard />
            </div>
          }
        />
        <Route path="/profile/:github" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

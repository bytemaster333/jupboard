import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getGitHubPRScore } from "../utils/github";

const RegisterForm = () => {
  const [wallet, setWallet] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const score = await getGitHubPRScore(github);

    const { error } = await supabase
      .from("contributors")
      .insert([{ wallet_address: wallet, github_username: github, score }]);
    
    if (error) {
      console.error(error);
      alert("Error: " + error.message);
    } else {
      setSuccess(true);
      setWallet("");
      setGithub("");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white text-black rounded-lg shadow-md p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Join JupBoard</h2>

      <div>
        <label className="block text-sm font-semibold mb-1">Wallet Address</label>
        <input
          type="text"
          placeholder="Your wallet address"
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">GitHub Username</label>
        <input
          type="text"
          placeholder="Your GitHub username"
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Register"}
      </button>

      {success && (
        <p className="text-green-600 text-center font-medium mt-2">
          ✅ Successfully submitted!
        </p>
      )}
    </form>
  );
};

export default RegisterForm;

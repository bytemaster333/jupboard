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
    const merged_pr_count = score / 10;

    const { error } = await supabase
      .from("contributors")
      .insert([
        {
          wallet_address: wallet,
          github_username: github,
          score,
          merged_pr_count,
          last_refreshed: new Date().toISOString(),
        },
      ]);

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
      className="w-full space-y-5 text-white"
    >
      {/* Wallet Input */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-300">
          Wallet Address
        </label>
        <input
          type="text"
          placeholder="Enter your wallet address"
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />
      </div>

      {/* GitHub Username */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-300">
          GitHub Username
        </label>
        <input
          type="text"
          placeholder="Enter your GitHub username"
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition duration-300 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Register"
        )}
      </button>

      {/* Success Message */}
      {success && (
        <div className="bg-green-600/90 text-white text-center py-2 rounded-md font-medium">
          ✅ Successfully submitted!
        </div>
      )}
    </form>
  );
};

export default RegisterForm;

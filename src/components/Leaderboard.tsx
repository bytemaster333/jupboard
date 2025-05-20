import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

type Contributor = {
  id: string;
  wallet_address: string;
  github_username: string;
  score: number;
};

const getBadge = (score: number) => {
  if (score >= 90) return { label: "Gold", emoji: "🥇", color: "text-yellow-400" };
  if (score >= 60) return { label: "Silver", emoji: "🥈", color: "text-gray-300" };
  if (score >= 30) return { label: "Bronze", emoji: "🥉", color: "text-orange-400" };
  return { label: "Rookie", emoji: "🎯", color: "text-blue-400" };
};

const Leaderboard = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      const { data, error } = await supabase
        .from("contributors")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.error("Error fetching leaderboard:", error.message);
      } else {
        setContributors(data as Contributor[]);
      }
      setLoading(false);
    };

    fetchContributors();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading leaderboard...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">🏆 Top Contributors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => {
          const badge = getBadge(contributor.score);

          return (
            <div
              key={contributor.id}
              className="bg-gradient-to-br from-[#1e293b] to-[#111827] text-white rounded-xl shadow-md p-5 transition-transform hover:scale-[1.015]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://github.com/${contributor.github_username}.png`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-purple-400"
                />
                <div>
                  <Link
                    to={`/profile/${contributor.github_username}`}
                    className="text-lg font-bold hover:underline"
                  >
                    @{contributor.github_username}
                  </Link>
                  <p className="text-sm text-gray-400">#{index + 1} Contributor</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 truncate">
                <strong>Wallet:</strong> {contributor.wallet_address.slice(0, 6)}...{contributor.wallet_address.slice(-4)}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-bold text-purple-300">{contributor.score} pts</p>
                <span className={`text-2xl ${badge.color}`} title={badge.label}>
                  {badge.emoji}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
